using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Comment")]
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string UserId { get; set; }
        public User User { get; set; } = null!;
        public int? TouristSpotId { get; set; }
        public TouristSpot? TouristSpot { get; set; }
        public int? PlaceTypeId { get; set; }
        public PlaceType? PlaceType { get; set; }

    }
}
