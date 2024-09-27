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
                Category = placeTypeModel.Category,
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
                Category = PlaceTypeDto.Category,
                Name = PlaceTypeDto.Name,
                Description = PlaceTypeDto.Description,
                Rating = PlaceTypeDto.Rating,
                PhotoUrls = PlaceTypeDto.PhotoUrls,
            };
        }
    }
}