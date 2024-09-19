namespace api.Models
{
    public class Favorite
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int TouristSpotId { get; set; }
        public TouristSpot TouristSpot { get; set; } = null!;
    }
}
