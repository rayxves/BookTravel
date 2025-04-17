using System.Text.Json.Serialization;

namespace api.Dtos;

public class GooglePlaceResponseById
{
    [JsonPropertyName("results")]
    public List<GoogleTouristSpotById> Results { get; set; }


}

public class GoogleTouristSpotById
{
    public string Place_Id { get; set; }
    public string Name { get; set; }
    [JsonPropertyName("rating")]
    public decimal Rating { get; set; }

    [JsonPropertyName("price_level")]
    public int? PriceLevel { get; set; }
    public List<GooglePhotoById> Photos { get; set; } = new List<GooglePhotoById>();
    public string? Formatted_address { get; set; }
}

public class GooglePhotoById
{
    [JsonPropertyName("photo_reference")]
    public string PhotoReference { get; set; }

}
