using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class PlaceTypesMappers
    {
        public static PlaceTypeDto ToPlaceTypeDto(this PlaceType placeTypeModel)
        {
            return new PlaceTypeDto
            {
                Id = placeTypeModel.Id,
                Name = placeTypeModel.Name,
                Description = placeTypeModel.Description,
                Rating = placeTypeModel.Rating,
                PhotoUrls = placeTypeModel.PhotoUrls,
                Comments = placeTypeModel.Comments.Select(comment => comment.ToCommentDto()).ToList(),
            };
        }

         public static PlaceType ToPlaceTypeFromCreatetDto(this CreatePlaceTypeRequestDto PlaceTypeDto)
        {

            return new PlaceType
            {
                Name = PlaceTypeDto.Name,
                Description = PlaceTypeDto.Description,
                Rating = PlaceTypeDto.Rating,
                PhotoUrls = PlaceTypeDto.PhotoUrls,
            };
        }
    }
}