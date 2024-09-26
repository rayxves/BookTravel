namespace api.Dtos
{
    public class PlaceTypeDto
    {
        public string Category { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public List<string> Photos { get; set; } = new List<string>();
        public List<CommentDto> Comments { get; set; }
    }
}