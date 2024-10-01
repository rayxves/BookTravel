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
        [Authorize]
        public async Task<IActionResult> AddFavorite(string name)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var touristSpot = await _spotRepo.GetByNameAsync(name);

            if (touristSpot == null)
            {
                //falta services api
                return NotFound("Stock not found");
            }

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);

            if (userFavorite.Any(n => n.Name.ToLower() == name))
            {
                return BadRequest("Cannot add same tourist spot to favorites.");
            }


            var favoriteModel = new Favorite
            {
                TouristSpotId = touristSpot.Id,
                UserId = appUser.Id
            };

            await _faveRepo.CreateAsync(favoriteModel);


            if (favoriteModel == null)
            {
                return StatusCode(500, "Could not create");
            }

            return Created();

        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteFavorite(string name)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);

            var filterTouristSpot = userFavorite.Where(n => n.Name.ToLower() == name.ToLower()).ToList();

            if (filterTouristSpot.Count() == 1)
            {
                await _faveRepo.DeleteFavorite(appUser, name);
            }
            else
            {
                return BadRequest("Tourist spot not in your favorites.");
            }

            return Ok();
        }
    }
}