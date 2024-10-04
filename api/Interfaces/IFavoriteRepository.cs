using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<List<FavoriteDto>> GetUserFavorite(User user);
        Task<Favorite> CreateAsync(Favorite favorite);
        Task<Favorite?> DeleteFavorite(User user, string name);
    }
}