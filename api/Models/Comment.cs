namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int UserId {get; set;}
        public User User { get; set; } = null!;
        public int TouristSpotId { get; set; }
        public TouristSpot TouristSpot { get; set; } = null!;
        
    }
}
