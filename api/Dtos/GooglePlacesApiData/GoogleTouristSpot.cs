using System.Text.Json.Serialization;

namespace api.Dtos;

public class GooglePlacesResponse
{
    [JsonPropertyName("results")]
    public List<GoogleTouristSpot> Results { get; set; }


}

public class GoogleTouristSpot
{
    public string Name { get; set; }
    public decimal Rating { get; set; }
    [JsonPropertyName("price_level")]
     public int? PriceLevel { get; set; }
    public List<GooglePhoto> Photos { get; set; } = new List<GooglePhoto>();
    public string? Formatted_address { get; set; }
}

public class GooglePhoto
{
    [JsonPropertyName("photo_reference")]
    public string PhotoReference { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
}
