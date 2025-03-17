namespace api.Dtos
{
    public class TouristSpotByFilterDto
    {
        public string Name { get; set; } = string.Empty;
        public double Rating { get; set; }
        public List<string> PhotoUrls { get; set; } = new List<string>();
        public string Address { get; set; } = string.Empty; // Novo campo para o endereço
    }
}
