using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PlaceTypeRepository : IPlaceTypeRepository
    {

        private readonly ApplicationDBContext _context;
        public PlaceTypeRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public Task<PlaceType> CreateAsync(PlaceType PlaceTypeModel)
        {
            throw new NotImplementedException();
        }

        public Task<PlaceType> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PlaceType>> GetAllAsync(PlaceTypeQueryObject query)
        {
            var placesTypes = _context.PlaceTypes.Include(c => c.Comments).ThenInclude(c => c.User).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                placesTypes = placesTypes.Where(n => n.Name.Contains(query.Name));
            }

            if (!string.IsNullOrWhiteSpace(query.Category))
            {
                placesTypes = placesTypes.Where(c => c.Category.Contains(query.Category));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    placesTypes = query.isDecsending ? placesTypes.OrderByDescending(ts => ts.Name) : placesTypes.OrderBy(ts => ts.Name);
                }
                else if (query.SortBy.Equals("Rating", StringComparison.OrdinalIgnoreCase))
                {
                    placesTypes = query.isDecsending ? placesTypes.OrderByDescending(ts => ts.Rating) : placesTypes.OrderBy(ts => ts.Rating);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var paginatedplacesTypes = await placesTypes.Skip(skipNumber).Take(query.PageSize).ToListAsync();

            return paginatedplacesTypes;
        }

        public Task<PlaceType> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<PlaceType> GetByNameAsync(string name)
        {
            throw new NotImplementedException();
        }
    }
}