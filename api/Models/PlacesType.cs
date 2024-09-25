namespace api.Models
{
    public class PlaceType
    {
        public string Name { get; set; } = string.Empty;
        public string FormattedAddress { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public List<Photo> Photos { get; set; } = new List<Photo>();
    }
}