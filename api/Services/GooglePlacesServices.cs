using System.Text.Json;
using api.Dtos;
using api.Models;
using Filters;


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


        public async Task<GooglePlacesResponse> GetFilteredPlacesAsync(FilterContext filterContext, string baseUrl)
        {
            string finalUrl = filterContext.ApplyFilters(baseUrl);

            var touristSpotResponse = await GetApiResponseAsync(finalUrl);

            return new GooglePlacesResponse
            {
                Results = touristSpotResponse.Results
            };
        }

        private async Task<GooglePlacesResponse> GetApiResponseAsync(string url)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException("Erro ao buscar dados na API do Google Places.");
            }

            var content = await response.Content.ReadAsStringAsync();
            if (string.IsNullOrWhiteSpace(content))
            {
                throw new HttpRequestException("Response content is null or empty.");
            }

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<GooglePlacesResponse>(content, options);
        }

        public async Task<GooglePlacesResponse> GetPlacesByLocationAsync(FilterContext filter, double latitude, double longitude)
        {
            string baseUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={_apiKey}&location={latitude.ToString(System.Globalization.CultureInfo.InvariantCulture)},{longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)}&radius=5000";
            return await GetFilteredPlacesAsync(filter, baseUrl);
        }

        public async Task<GooglePlacesResponse> GetPlacesByNameAsync(FilterContext filter, string name)
        {
            string baseUrl = $"https://maps.googleapis.com/maps/api/place/textsearch/json?key={_apiKey}&query={Uri.EscapeDataString(name)}";
            return await GetFilteredPlacesAsync(filter, baseUrl);
        }

    }
}
