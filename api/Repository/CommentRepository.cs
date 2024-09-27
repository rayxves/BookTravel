using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public Task<Comment> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Comment>> GetAllAsync(CommentQueryObject query)
        {
            var comments = _context.Comments.Include(u => u.User).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {

                comments = comments.Where(n => (n.TouristSpot != null && n.TouristSpot.Name == query.Name) || (n.PlaceType != null && n.PlaceType.Name == query.Name));
            }

            if (query.isDecsending == true)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(u => u.User).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Comment> UpdateAsync(int id, UpdateCommentRequestDto commentDto)
        {
            var existingComment = await _context.Comments.Include(u => u.User).FirstOrDefaultAsync(i => i.Id == id);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Content = commentDto.Content;

            await _context.SaveChangesAsync();
            return existingComment;
        }
    }
}