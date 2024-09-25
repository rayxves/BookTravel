namespace api.Models
{
    public class PlacesResponse
    {
        public List<PlaceType> Results { get; set; } = new List<PlaceType>();
        public string Status { get; set; } = string.Empty;
    }
}