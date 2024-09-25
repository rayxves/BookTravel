using System.Text.Json;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public class GooglePlacesService
    {
        private readonly string? _apiKey;
        private readonly HttpClient _httpClient;
        public GooglePlacesService(HttpClient httpClient)
        {
            _apiKey = Environment.GetEnvironmentVariable("GOOGLE_PLACES_API_KEY");
            _httpClient = httpClient;
        }
        public static Dictionary<string, string[]> TouristSpotPlaceTypes { get; } = new Dictionary<string, string[]>
    {
        //A chave é o tipo de lugar na aplicação e o valor é um array com os tipos correspondentes na API Google Places
        { "Museu", new[] { "museum", "art_gallery" } },
        { "Restaurante", new[] { "restaurant" } },
        { "Parque", new[] { "park" } },
        { "Hotel", new[] { "lodging" } },
    };

        private string GetPhotoUrl(string photoReference)
        {
            const int maxWidth = 600;
            return $"https://maps.googleapis.com/maps/api/place/photo?maxwidth={maxWidth}&photoreference={photoReference}&key={_apiKey}";
        }

        public async Task<List<TouristSpot>> SearchPlacesAsync(string name, string[] types)
        {
            var typesStr = string.Join("|", types);
            var url = $"https://maps.googleapis.com/maps/api/place/textsearch/json?query={name}&type={typesStr}&key={_apiKey}";
            var response = await _httpClient.GetStringAsync(url); //faz req pra url e retorna o conteudo como str
            var placesResult = JsonSerializer.Deserialize<PlacesResponse>(response);

            if (placesResult?.Results != null)
            {
                var touristSpots = placesResult.Results.Select(place => new TouristSpot
                {
                    Name = place.Name,
                    Description = place.FormattedAddress,
                    Rating = place.Rating,
                    PhotoUrls = place.Photos?.Select(photo => GetPhotoUrl(photo.PhotoReference)).ToList() ?? new List<string>()
                }).ToList();

            }
            return new List<TouristSpot>();
        }
    }
}