using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<List<TouristSpot>> GetUserPortfolio(User user);
        Task<Favorite> CreateAsync(Favorite favorite);
        Task<Favorite> DeletePortfolio(User user, string name);
    }
}