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
    public double Rating { get; set; }
    public List<GooglePhoto> Photos { get; set; } = new List<GooglePhoto>();
    public string Vicinity { get; set; }
}

public class GooglePhoto
{
    [JsonPropertyName("photo_reference")]
    public string PhotoReference { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
}
