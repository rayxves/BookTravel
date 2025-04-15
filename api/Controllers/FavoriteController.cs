using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Services;
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
        private readonly GooglePlacesServices _googlePlacesServices;


        [ActivatorUtilitiesConstructor]
        public FavoriteController(IFavoriteRepository faveRepo, UserManager<User> userManager, ITouristSpotRepository spotRepo, GooglePlacesServices googlePlacesServices)
        {
            _userManager = userManager;
            _faveRepo = faveRepo;
            _spotRepo = spotRepo;
            _googlePlacesServices = googlePlacesServices;

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

                var googleTouristSpot = await _googlePlacesServices.GetPlaceDetailsByName(touristSpotName);
                if (googleTouristSpot == null)
                {
                    return NotFound("Tourist spot not found");

                }
                var touristSpotModel = new TouristSpot
                {
                    Name = googleTouristSpot.Name,
                    Description = googleTouristSpot.Formatted_address ?? "",
                    Rating = googleTouristSpot.Rating,
                    PhotoUrls = googleTouristSpot.Photos.Select(x => x.PhotoReference).ToList()
                };
                await _spotRepo.CreateAsync(touristSpotModel);
                touristSpot = touristSpotModel;

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