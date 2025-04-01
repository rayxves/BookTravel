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
            };
        }

        public static TouristSpotByFilterDto ToTouristSpotByFilterDto(this GoogleTouristSpot googleTouristSpot)
        {
            if (googleTouristSpot == null)
            {
                throw new ArgumentNullException(nameof(googleTouristSpot));
            }

            return new TouristSpotByFilterDto
            {
                Name = googleTouristSpot.Name,
                Rating = googleTouristSpot.Rating,
                PhotoUrls = googleTouristSpot.Photos?.Select(p => p.PhotoReference).ToList() ?? new List<string>(),
                Address =  googleTouristSpot.Formatted_address ?? null,
            };
        }


    }
}