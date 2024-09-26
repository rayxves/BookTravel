using api.Dtos;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ITouristSpotRepository
    {
        Task<List<TouristSpot>> GetAllAsync(QueryObject query);
        Task<TouristSpot> GetByIdAsync(int id);
        Task<TouristSpot> GetByNameAsync(string name);
        Task<TouristSpot> CreateAsync(TouristSpot touristSpotModel);
        Task<TouristSpot> UpdateAsync(int id, UpdateTouristSpotRequestDto touristSpotDto);
        Task<TouristSpot> DeleteAsync(int id);
    }
}