using api.Helpers;
using api.Models;

namespace api.Interfaces{
    public interface ITouristSpotRepository
    {
        Task<List<TouristSpot>> GetAllAsync(QueryObject query);
        Task<TouristSpot> GetByIdAsync(int id);
        Task<TouristSpot> GetByNameAsync(string name);
    }
}