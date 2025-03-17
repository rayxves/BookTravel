using System.Text.Json;
using api.Dtos;
using api.Models;
using Context;
using Strategies;

namespace api.Services
{
    public class GooglePlacesServices
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public GooglePlacesServices(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["GooglePlacesApi:ApiKey"];
        }

        public async Task<string> GetPlaceIdByName(string placeName)
        {
            string requestUrl = $"https://maps.googleapis.com/maps/api/place/textsearch/json?query={Uri.EscapeDataString(placeName)}&key={_apiKey}";

            var response = await _httpClient.GetStringAsync(requestUrl);
            var jsonResponse = JsonDocument.Parse(response);

            if (jsonResponse.RootElement.TryGetProperty("results", out var results) && results.GetArrayLength() > 0)
            {
                var placeId = results[0].GetProperty("place_id").GetString();
                return placeId ?? string.Empty;
            }

            return string.Empty;
        }

        public async Task<string> GetPlaceDetails(string placeId)
        {
            var requestUrl = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={_apiKey}";
            var response = await _httpClient.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new HttpRequestException("Failed to retrieve place details from Google Places API.");
            }
        }

        public async Task<GooglePlacesData> GetPlaceDetailsByName(string placeName)
        {
            var placeId = await GetPlaceIdByName(placeName);

            if (!string.IsNullOrEmpty(placeId))
            {
                var placeDetailsJson = await GetPlaceDetails(placeId);
                var jsonResponse = JsonDocument.Parse(placeDetailsJson);

                if (jsonResponse.RootElement.TryGetProperty("result", out var result))
                {
                    var googlePlaceData = new GooglePlacesData
                    {
                        Name = result.GetProperty("name").GetString() ?? string.Empty,
                        Description = result.TryGetProperty("formatted_address", out var address) ? address.GetString() ?? string.Empty : string.Empty,
                        Rating = result.TryGetProperty("rating", out var rating) ? rating.GetDecimal() : 0,
                        Photos = result.TryGetProperty("photos", out var photos)
                        ? photos.EnumerateArray().Take(5).Select(photo => photo.GetProperty("photo_reference").GetString() ?? string.Empty).ToList() // Limitando a 5 fotos.
                        : new List<string>(),
                        Types = result.TryGetProperty("types", out var types)
                        ? types.EnumerateArray().Select(type => type.GetString() ?? string.Empty).ToArray()
                        : Array.Empty<string>()
                    };

                    return googlePlaceData;
                }
            }

            return null!;
        }

        public async Task<GooglePlacesResponse> GetFilteredPlacesAsync(IFilterStrategy strategy, double latitude, double longitude)
        {
            string requestUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={_apiKey}&location={latitude.ToString(System.Globalization.CultureInfo.InvariantCulture)},{longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)}&radius=5000";


            FilterContext filterContext = new FilterContext();
            filterContext.SetStrategy(strategy);
            string finalUrl = filterContext.ApplyFilter(requestUrl);
            HttpResponseMessage response = await _httpClient.GetAsync(finalUrl);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException("Erro ao buscar dados na API do Google Places.");
            }

            var content = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            var touristSpotResponse = JsonSerializer.Deserialize<GooglePlacesResponse>(content, options);

            var filteredPlaces = filterContext.ApplyRatingFilter(touristSpotResponse.Results);
            Console.WriteLine(filteredPlaces);
            GooglePlacesResponse googlePlacesResponse = new GooglePlacesResponse
            {
                Results = filteredPlaces
            };

            return googlePlacesResponse;
        }


    }
}
