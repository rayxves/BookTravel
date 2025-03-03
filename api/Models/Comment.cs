using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Comment")]
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        private DateTime _createdOn;
        public DateTime CreatedOn
        {
            get => _createdOn;
            set => _createdOn = value.Kind == DateTimeKind.Utc ? value : value.ToUniversalTime();
        }
        public string UserId { get; set; }
        public User User { get; set; } = null!;
        public int? TouristSpotId { get; set; }
        public TouristSpot? TouristSpot { get; set; }
        public int? PlaceTypeId { get; set; }

    }
}
