using api.Dtos;
using api.Models;


namespace api.Mappers
{
    public static class TouristSpotMappers
    {
        public static TouristSpotDto ToTouristSpotDto(this TouristSpot touristSpotModel)
        {
            return new TouristSpotDto
            {
                Id = touristSpotModel.Id,
                Name = touristSpotModel.Name,
                Description = touristSpotModel.Description,
                Rating = touristSpotModel.Rating,
                PhotoUrls = touristSpotModel.PhotoUrls,
                Comments = touristSpotModel.Comments.Select(comment => comment.ToCommentDto()).ToList(),
                PlaceTypes = touristSpotModel.PlaceTypes.Select(place => place.ToPlaceTypeDto()).ToList()
            };
        }
    }
}