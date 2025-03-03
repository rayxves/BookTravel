namespace api.Dtos
{
    public class TouristSpotDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public List<string> PhotoUrls { get; set; } = new List<string>();
        public List<CommentDto> Comments { get; set; }


    }
}