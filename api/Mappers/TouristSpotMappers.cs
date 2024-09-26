using api.Dtos;
using api.Models;


namespace api.Mappers
{
    public static class TouristSpotMappers
    {
        public static TouristSpotDto ToTouristSpotDto(this TouristSpot touristSpotModel)
        {
            if (touristSpotModel == null)
            {
                throw new ArgumentNullException(nameof(touristSpotModel));
            }

            return new TouristSpotDto
            {
                Id = touristSpotModel.Id,
                Name = touristSpotModel.Name,
                Description = touristSpotModel.Description,
                Rating = touristSpotModel.Rating,
                PhotoUrls = touristSpotModel.PhotoUrls,
                Comments = touristSpotModel.Comments?.Select(comment => comment.ToCommentDto()).ToList() ?? new List<CommentDto>(),
                PlaceTypes = touristSpotModel.PlaceTypes?.Select(place => place.ToPlaceTypeDto()).ToList() ?? new List<PlaceTypeDto>()
            };
        }

        public static TouristSpot ToTouristSpotFromCreatetDto(this CreateTouristSpotRequestDto touristSpotDto)
        {

            return new TouristSpot
            {
                Name = touristSpotDto.Name,
                Description = touristSpotDto.Description,
                Rating = touristSpotDto.Rating,
                PhotoUrls = touristSpotDto.PhotoUrls,
            };
        }


    }
}