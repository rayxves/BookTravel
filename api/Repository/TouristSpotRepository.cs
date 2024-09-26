using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;

using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TouristSpotRepository : ITouristSpotRepository
    {
        private readonly ApplicationDBContext _context;
        public TouristSpotRepository(ApplicationDBContext context)
        {
            _context = context;

        }
        public async Task<List<TouristSpot>> GetAllAsync(QueryObject query)
        {
            var touristSpot = _context.TouristSpots
                .Include(ts => ts.Comments)
                .ThenInclude(c => c.User)
                .Include(ts => ts.PlaceTypes)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                touristSpot = touristSpot.Where(n => n.Name.Contains(query.Name));

            }

            if (!string.IsNullOrWhiteSpace(query.PlaceName) || !string.IsNullOrWhiteSpace(query.PlaceCategory))
            {
                touristSpot = touristSpot.Where(ts => ts.PlaceTypes.Any(pt =>
                    (string.IsNullOrWhiteSpace(query.PlaceName) || pt.Name.Contains(query.PlaceName)) &&
                    (string.IsNullOrWhiteSpace(query.PlaceCategory) || pt.Category == query.PlaceCategory)));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    touristSpot = query.isDecsending ? touristSpot.OrderByDescending(ts => ts.Name) : touristSpot.OrderBy(ts => ts.Name);
                }
                else if (query.SortBy.Equals("Rating", StringComparison.OrdinalIgnoreCase))
                {
                    touristSpot = query.isDecsending ? touristSpot.OrderByDescending(ts => ts.Rating) : touristSpot.OrderBy(ts => ts.Rating);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var paginatedTouristSpots = await touristSpot.Skip(skipNumber).Take(query.PageSize).ToListAsync();

            return paginatedTouristSpots;
        }
    }
}