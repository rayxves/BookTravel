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
                Category = placeTypeModel.Category,
                Name = placeTypeModel.Name,
                Description = placeTypeModel.Description,
                Rating = placeTypeModel.Rating,
                Photos = placeTypeModel.Photos,
                Comments = placeTypeModel.Comments.Select(comment => comment.ToCommentDto()).ToList(),
            };
        }
    }
}