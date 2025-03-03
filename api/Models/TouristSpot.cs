using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("TouristSpot")]
    public class TouristSpot
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(2,1)")]
        public decimal Rating { get; set; }
        public List<string> PhotoUrls { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();

    }
}
