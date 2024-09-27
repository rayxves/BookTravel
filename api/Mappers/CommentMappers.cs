using api.Models;

namespace api.Dtos
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            if (commentModel == null)
            {
                throw new ArgumentNullException(nameof(commentModel));
            }


            if (commentModel.User == null)
            {
                throw new InvalidOperationException("Comment does not have an associated user.");
            }

            return new CommentDto
            {
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                CreatedBy = commentModel.User.UserName,
                TouristSpotId = commentModel.TouristSpotId,
                PlaceTypeId = commentModel.PlaceTypeId
            };
        }

        public static Comment ToCommentFromCreatetDto(this CreateCommentRequestDto commentDto, int? touristSpotId = null, int? placeTypeId = null)
        {

            return new Comment
            {
                Content = commentDto.Content,
                CreatedOn = DateTime.Now,
                TouristSpotId = touristSpotId,
                PlaceTypeId = placeTypeId,
            };
        }
    }
}