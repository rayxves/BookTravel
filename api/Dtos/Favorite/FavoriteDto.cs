using api.Models;

namespace api.Dtos
{
    public class FavoriteDto
    {
        public TouristSpot? TouristSpot { get; set; }
        public PlaceType? PlaceType { get; set; }
    }
}