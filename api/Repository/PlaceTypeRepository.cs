using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<PlaceType> CreateAsync(PlaceType placeTypeModel)
        {
            await _context.PlaceTypes.AddAsync(placeTypeModel);
            await _context.SaveChangesAsync();
            return placeTypeModel;
        }

        public async Task<PlaceType> DeleteAsync(int id)
        {
            var placeTypeModel = await _context.PlaceTypes.FirstOrDefaultAsync(i => i.Id == id);

            if (placeTypeModel == null)
            {
                return null;
            }

            _context.PlaceTypes.Remove(placeTypeModel);
            await _context.SaveChangesAsync();

            return placeTypeModel;
        }

        public async Task<List<PlaceType>> GetAllAsync(PlaceTypeQueryObject query)
        {
            var placesTypes = _context.PlaceTypes.Include(c => c.Comments).ThenInclude(c => c.User).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                placesTypes = placesTypes.Where(n => n.Name.ToLower().Contains(query.Name.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(query.Category))
            {
                placesTypes = placesTypes.Where(c => c.Category.Contains(query.Category));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    placesTypes = query.isDecsending ? placesTypes.OrderByDescending(ts => ts.Name.ToLower()) : placesTypes.OrderBy(ts => ts.Name.ToLower());
                }
                else if (query.SortBy.Equals("Rating", StringComparison.OrdinalIgnoreCase))
                {
                    placesTypes = query.isDecsending ? placesTypes.OrderByDescending(ts => ts.Rating) : placesTypes.OrderBy(ts => ts.Rating);
                }
                else if (query.SortBy.Equals("Category", StringComparison.OrdinalIgnoreCase))
                {
                    placesTypes = query.isDecsending ? placesTypes.OrderByDescending(ts => ts.Category) : placesTypes.OrderBy(ts => ts.Category);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var paginatedplacesTypes = await placesTypes.Skip(skipNumber).Take(query.PageSize).ToListAsync();

            return paginatedplacesTypes;
        }

        public async Task<PlaceType> GetByIdAsync(int id)
        {
            return await _context.PlaceTypes.Include(pt => pt.Comments).ThenInclude(c => c.User).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<PlaceType> GetByNameAsync(string name)
        {
            return await _context.PlaceTypes.Include(pt => pt.Comments).ThenInclude(c => c.User).FirstOrDefaultAsync(n => n.Name.ToLower() == name.ToLower());
        }

        public async Task<PlaceType> UpdateAsync(int id, UpdatePlaceTypeRequestDto placeTypeDto)
        {
            var existingPlaceType = await _context.PlaceTypes.FirstOrDefaultAsync(i => i.Id == id);

            if (existingPlaceType == null)
            {
                return null;
            }

            existingPlaceType.Category = placeTypeDto.Category;
            existingPlaceType.Name = placeTypeDto.Name;
            existingPlaceType.Description = placeTypeDto.Description;
            existingPlaceType.Rating = placeTypeDto.Rating;
            existingPlaceType.PhotoUrls = placeTypeDto.PhotoUrls;

            await _context.SaveChangesAsync();
            return existingPlaceType;
        }
    }
}