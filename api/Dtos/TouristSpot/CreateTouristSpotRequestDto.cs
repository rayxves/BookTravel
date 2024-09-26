using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class CreateTouristSpotRequestDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(500, ErrorMessage = "A descrição não pode exceder 500 caracteres.")]
        public string Description { get; set; } = string.Empty;

        [Range(0, 5, ErrorMessage = "A avaliação deve estar entre 0 e 5.")]
        public decimal Rating { get; set; }

        public List<string> PhotoUrls { get; set; } = new List<string>();
    }
}
