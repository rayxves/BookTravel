using System.Text.Json;
using api.Models;

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

        public bool IsPlaceType(GooglePlacesData data)
        {
            string[] placeTypes = {
        "restaurant", "museum", "park", "bar", "cafe", "airport", "amusement_park", "aquarium", "art_gallery",
        "bakery", "bank", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station",
        "casino", "clothing_store", "doctor", "electrician", "embassy", "fire_station", "gym", "hair_care",
        "hospital", "library", "movie_theater", "night_club", "parking", "pharmacy", "police", "post_office",
        "school", "shopping_mall", "stadium", "subway_station", "taxi_stand", "tourist_attraction",
        "train_station", "transit_station", "university", "zoo"
    };

            //Intersect é usado para comparar duas listas, arrays etc e retornar apenas os elementos que são comuns a ambas
            return data.Types.Intersect(placeTypes).Any();
        }


    }
}
