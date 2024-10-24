using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("PlaceType")]
    public class PlaceType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public List<string> PhotoUrls { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public int TouristSpotId { get; set; }
        public TouristSpot TouristSpot { get; set; } = null!;
    }
}