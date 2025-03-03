namespace api.Models
{
    public class GooglePlacesData
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public List<string> Photos { get; set; } = new List<string>();    
        public string[] Types { get; set; } = Array.Empty<string>();
        public int? TouristSpotId { get; set; }
        public TouristSpot? TouristSpot { get; set; }
    }
}