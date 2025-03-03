
using System.ComponentModel.DataAnnotations;


namespace api.Dtos
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Content must be 5 characters.")]
        [MaxLength(280, ErrorMessage = "Content cannot be over 280 characters.")]
        public string Content { get; set; } = string.Empty;
    }
}