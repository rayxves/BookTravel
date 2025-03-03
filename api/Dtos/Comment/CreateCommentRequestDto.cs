
using System.ComponentModel.DataAnnotations;


namespace api.Dtos
{
    public class CreateCommentRequestDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string TouristSpotName { get; set; } = string.Empty;
        [Required]
        [MinLength(5, ErrorMessage = "Content must be 5 characters.")]
        [MaxLength(280, ErrorMessage = "Content cannot be over 280 characters.")]
        public string Content { get; set; } = string.Empty;
    }
}