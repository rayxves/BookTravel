using api.Data;
using api.Dtos;
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

        public async Task<TouristSpot> CreateAsync(TouristSpot touristSpotModel)
        {

            await _context.TouristSpots.AddAsync(touristSpotModel);

            await _context.SaveChangesAsync();
            return touristSpotModel;
        }



        public async Task<TouristSpot> DeleteAsync(int id)
        {
            var touristSpotModel = await _context.TouristSpots.FirstOrDefaultAsync(i => i.Id == id);

            if (touristSpotModel == null)
            {
                return null;
            }

            _context.TouristSpots.Remove(touristSpotModel);
            await _context.SaveChangesAsync();

            return touristSpotModel;
        }

        public async Task<List<TouristSpot>> GetAllAsync(QueryObject query)
        {
            var touristSpot = _context.TouristSpots
               .Include(ts => ts.Comments)
                   .ThenInclude(c => c.User)
               .AsSplitQuery()
               .AsQueryable();

            if (touristSpot == null)
            {
                throw new ArgumentNullException("No tourist spot created");
            }

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                touristSpot = touristSpot.Where(n => n.Name.ToLower().Contains(query.Name.ToLower()));
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
            else
            {
                touristSpot = touristSpot.OrderBy(ts => ts.Id);
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var paginatedTouristSpots = await touristSpot.Skip(skipNumber).Take(query.PageSize).ToListAsync();

            return paginatedTouristSpots;
        }
        public async Task<TouristSpot> GetByIdAsync(int id)
        {
            return await _context.TouristSpots.Include(c => c.Comments).ThenInclude(c => c.User).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<TouristSpot> GetByNameAsync(string name)
        {
            return await _context.TouristSpots.Include(c => c.Comments).ThenInclude(c => c.User).FirstOrDefaultAsync(n => n.Name.ToLower() == name.ToLower());
        }

        public async Task<TouristSpot> UpdateAsync(int id, UpdateTouristSpotRequestDto touristSpotDto)
        {
            var existingTouristSpot = await _context.TouristSpots.FirstOrDefaultAsync(i => i.Id == id);

            if (existingTouristSpot == null)
            {
                return null;
            }

            existingTouristSpot.Name = touristSpotDto.Name;
            existingTouristSpot.Description = touristSpotDto.Description;
            existingTouristSpot.Rating = touristSpotDto.Rating;
            existingTouristSpot.PhotoUrls = touristSpotDto.PhotoUrls;

            await _context.SaveChangesAsync();
            return existingTouristSpot;
        }
    }
}