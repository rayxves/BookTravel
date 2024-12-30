using api.Dtos;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllByUserAsync(string userId, string? placeName = null);
        Task<List<Comment>> GetAllAsync(CommentQueryObject query);
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment> UpdateAsync(int id, UpdateCommentRequestDto commentDto);
        Task<Comment> DeleteAsync(int id);
    }
}