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
        private readonly IPlaceTypeRepository _placeRepo;

        [ActivatorUtilitiesConstructor]
        public FavoriteController(IFavoriteRepository faveRepo, UserManager<User> userManager, ITouristSpotRepository spotRepo, IPlaceTypeRepository placeRepo)
        {
            _userManager = userManager;
            _faveRepo = faveRepo;
            _spotRepo = spotRepo;
            _placeRepo = placeRepo;
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
        public async Task<IActionResult> AddFavorite([FromBody] string name)
        {

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            var touristSpot = await _spotRepo.GetByNameAsync(name);
            if (touristSpot == null)
            {
                var placeType = await _placeRepo.GetByNameAsync(name);
                if (placeType == null)
                {
                    return NotFound();
                }

                var userFavoritePlaceType = await _faveRepo.GetUserFavorite(appUser);
                if (userFavoritePlaceType.Any(n => n.PlaceType?.Name.ToLower() == name.ToLower()))
                {
                    return BadRequest("Cannot add same place type to favorites.");
                }

                var favoriteModelPlaceType = new Favorite
                {
                    PlaceTypeId = placeType.Id,
                    UserId = appUser.Id,
                };

                await _faveRepo.CreateAsync(favoriteModelPlaceType);


                if (favoriteModelPlaceType == null)
                {
                    return StatusCode(500, "Could not create");
                }

                return Created();

            }

            var userFavoriteTouristSpot = await _faveRepo.GetUserFavorite(appUser);
            if (userFavoriteTouristSpot.Any(n => n.TouristSpot?.Name.ToLower() == name.ToLower()))
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
        public async Task<IActionResult> DeleteFavorite(string name, string type)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);

            var filterTouristSpot = userFavorite.Where(f => f.TouristSpot?.Name.ToLower() == name.ToLower()).ToList();

            if (filterTouristSpot.Count() == 1)
            {
                await _faveRepo.DeleteFavorite(appUser, name);
                return Ok("Tourist spot removed from favorites.");
            }
            else
            {
                var filterPlaceType = userFavorite.Where(f => f.PlaceType?.Name.ToLower() == name.ToLower()).ToList();

                if (filterPlaceType.Count() == 1)
                {
                    await _faveRepo.DeleteFavorite(appUser, name);
                    return Ok("Place type removed from favorites.");
                }
                else
                {
                    return BadRequest("Not in your favorites.");
                }
            }

        }
    }
}