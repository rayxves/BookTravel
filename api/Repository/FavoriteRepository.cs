using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly ApplicationDBContext _context;
        public FavoriteRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Favorite> CreateAsync(Favorite favorite)
        {
            await _context.Favorites.AddAsync(favorite);

            await _context.Entry(favorite)
                .Reference(f => f.TouristSpot)
                .Query()
                .LoadAsync();

            await _context.SaveChangesAsync();
            return favorite;
        }

        public async Task<Favorite?> DeleteFavorite(User user, string name)
        {
            var favoriteModal = await _context.Favorites
                .FirstOrDefaultAsync(fav =>
                fav.UserId == user.Id &&
                fav.TouristSpot != null && fav.TouristSpot.Name.ToLower() == name.ToLower());

            if (favoriteModal is null)
                return null;

            _context.Favorites.Remove(favoriteModal);
            await _context.SaveChangesAsync();
            return favoriteModal;
        }

        public async Task<List<FavoriteDto>> GetUserFavorite(User user)
        {
            return await _context.Favorites
                .Where(u => u.UserId == user.Id)
                .Include(f => f.TouristSpot)
                    .ThenInclude(ts => ts.Comments)
                .Select(f => new FavoriteDto
                {
                    TouristSpot = f.TouristSpot.ToTouristSpotDto(),
                })
                .ToListAsync();
        }

    }
}