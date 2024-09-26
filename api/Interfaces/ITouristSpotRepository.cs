using api.Helpers;
using api.Models;

namespace api.Interfaces{
    public interface ITouristSpotRepository
    {
        Task<List<TouristSpot>> GetAllAsync(QueryObject query);
    }
}