using api.Dtos;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IPlaceTypeRepository
    {
        Task<List<PlaceType>> GetAllAsync(PlaceTypeQueryObject query);
        Task<PlaceType> GetByIdAsync(int id);
        Task<PlaceType> GetByNameAsync(string name);
        Task<PlaceType> CreateAsync(PlaceType placeTypeModel);
        Task<PlaceType> UpdateAsync(int id, UpdatePlaceTypeRequestDto placeTypeDto);
        Task<PlaceType> DeleteAsync(int id);
    }
}