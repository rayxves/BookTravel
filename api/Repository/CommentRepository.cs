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

        public async Task<Comment> DeleteAsync(int id)
        {
            var existingComment = await _context.Comments.FirstOrDefaultAsync(i => i.Id == id);

            if (existingComment == null)
            {
                return null;
            }

            _context.Comments.Remove(existingComment);
            await _context.SaveChangesAsync();
            return existingComment;
        }

        public Task<List<Comment>> GetAllAsync(CommentQueryObject query)
        {
            var comments = _context.Comments.Include(u => u.User).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {

                comments = comments.Where(n => n.TouristSpot != null && n.TouristSpot.Name.ToLower() == query.Name.ToLower());
            }

            if (query.isDecsending)
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



        public async Task<List<Comment>> GetAllByUserAsync(string userId, string? placeName = null)
        {
            var comments = _context.Comments
            .Include(u => u.User)
            .Include(c => c.TouristSpot)
            .AsQueryable();

            comments = comments.Where(c => c.UserId == userId);

            if (!string.IsNullOrWhiteSpace(placeName))
            {
                comments = comments.Where(c =>
                    c.TouristSpot != null && c.TouristSpot.Name.ToLower() == placeName.ToLower());
            }

            return await comments.ToListAsync();
        }
    }
}