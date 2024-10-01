using api.Data;
using api.Interfaces;
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
                .Include(ts => ts.PlaceTypes)
                .LoadAsync();
            await _context.SaveChangesAsync();
            return favorite;
        }

        public async Task<Favorite> DeleteFavorite(User user, string name)
        {
            var favoriteModal = await _context.Favorites.FirstOrDefaultAsync(x => x.UserId == user.Id && x.TouristSpot.Name.ToLower() == name.ToLower());
            if (favoriteModal == null)
            {
                return null;
            }

            _context.Favorites.Remove(favoriteModal);
            await _context.SaveChangesAsync();
            return favoriteModal;
        }

        public async Task<List<TouristSpot>> GetUserFavorite(User user)
        {
            return await _context.Favorites
                .Where(u => u.UserId == user.Id)
                .Include(f => f.TouristSpot)
                    .ThenInclude(ts => ts.PlaceTypes)
                .Select(f => f.TouristSpot)
                .ToListAsync();
        }
    }
}