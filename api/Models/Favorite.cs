using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Favorite")]
    public class Favorite
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; } = null!;
        public int? TouristSpotId { get; set; }
        public TouristSpot? TouristSpot { get; set; }

    }
}
