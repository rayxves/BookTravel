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



        public async Task<GoogleTouristSpot?> GetPlaceDetailsByName(string placeName)
        {
            string requestUrl = $"https://maps.googleapis.com/maps/api/place/textsearch/json?query={Uri.EscapeDataString(placeName)}&key={_apiKey}";
            var response = await _httpClient.GetAsync(requestUrl);
            var responseBody = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var placeData = JsonSerializer.Deserialize<GooglePlacesResponse>(responseBody, options);

            if (placeData?.Results.Count > 0)
            {
                return placeData.Results[0];
            }
            return null;


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

            Console.WriteLine(content);

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


        public async Task<GooglePlacesResponse?> GetPlacesByName(string placeName)
        {
            string requestUrl = $"https://maps.googleapis.com/maps/api/place/textsearch/json?query={Uri.EscapeDataString(placeName)}&key={_apiKey}";
            var response = await _httpClient.GetAsync(requestUrl);
            var responseBody = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var placeData = JsonSerializer.Deserialize<GooglePlacesResponse>(responseBody, options);

            if (placeData?.Results.Count > 0)
            {
                return placeData;
            }
            return null;
        }

    }


}
