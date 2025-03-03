using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Route("api/favorite")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IFavoriteRepository _faveRepo;
        private readonly ITouristSpotRepository _spotRepo;


        [ActivatorUtilitiesConstructor]
        public FavoriteController(IFavoriteRepository faveRepo, UserManager<User> userManager, ITouristSpotRepository spotRepo)
        {
            _userManager = userManager;
            _faveRepo = faveRepo;
            _spotRepo = spotRepo;

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserFavorite()
        {
            var username = User.GetUsername();

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Username claim not found");
            }

            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("User not found");
            }

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);
            return Ok(userFavorite);
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public async Task<IActionResult> AddFavorite(string touristSpotName)
        {

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            var touristSpot = await _spotRepo.GetByNameAsync(touristSpotName);
            if (touristSpot == null)
            {
                return NotFound("Tourist spot not found");
            }

            var userFavoriteTouristSpot = await _faveRepo.GetUserFavorite(appUser);
            if (userFavoriteTouristSpot.Any(n => n.TouristSpot?.Name.ToLower() == touristSpotName.ToLower()))
            {
                return BadRequest("Cannot add same tourist spot to favorites.");
            }

            var favoriteModelTouristSpot = new Favorite
            {
                TouristSpotId = touristSpot.Id,
                UserId = appUser.Id
            };

            await _faveRepo.CreateAsync(favoriteModelTouristSpot);
            return Created();

        }

        [HttpDelete]
        [Route("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteFavorite(string name)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);

            var filterTouristSpot = userFavorite.Any(f => f.TouristSpot?.Name.ToLower() == name.ToLower());

            if (filterTouristSpot)
            {
                await _faveRepo.DeleteFavorite(appUser, name);
                return Ok("Tourist spot removed from favorites.");
            }
            else
            {
                return BadRequest("Tourist Spot not in your favorites.");

            }

        }
    }
}