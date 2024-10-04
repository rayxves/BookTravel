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
        [Authorize]
        public async Task<IActionResult> AddFavorite(string name, string type)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            if (type.ToLower() == "touristspot")
            {
                var touristSpot = await _spotRepo.GetByNameAsync(name);
                if (touristSpot == null)
                {
                    return NotFound("Tourist spot not found");
                }

                var userFavorite = await _faveRepo.GetUserFavorite(appUser);
                if (userFavorite.Any(n => n.TouristSpot?.Name.ToLower() == name.ToLower()))
                {
                    return BadRequest("Cannot add same tourist spot to favorites.");
                }

                var favoriteModel = new Favorite
                {
                    TouristSpotId = touristSpot.Id,
                    UserId = appUser.Id
                };

                await _faveRepo.CreateAsync(favoriteModel);
                return Created();
            }
            else if (type.ToLower() == "placetype")
            {
                var placeType = await _placeRepo.GetByNameAsync(name);
                if (placeType == null)
                {
                    return NotFound("Place type not found");
                }

                var userFavorite = await _faveRepo.GetUserFavorite(appUser);
                if (userFavorite.Any(n => n.PlaceType?.Name.ToLower() == name.ToLower()))
                {
                    return BadRequest("Cannot add same place type to favorites.");
                }

                var favoriteModel = new Favorite
                {
                    PlaceTypeId = placeType.Id,
                    UserId = appUser.Id
                };

                await _faveRepo.CreateAsync(favoriteModel);


                if (favoriteModel == null)
                {
                    return StatusCode(500, "Could not create");
                }

                return Created();
            }
            return BadRequest("Invalid favorite type.");
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteFavorite(string name, string type)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser is null)
                return Unauthorized("User not found");

            var userFavorite = await _faveRepo.GetUserFavorite(appUser);

            if (type.ToLower() == "touristspot")
            {
                var filterTouristSpot = userFavorite.Where(f => f.TouristSpot?.Name.ToLower() == name.ToLower()).ToList();

                if (filterTouristSpot.Count() == 1)
                {
                    await _faveRepo.DeleteFavorite(appUser, name);
                    return Ok("Tourist spot removed from favorites.");
                }
                else
                {
                    return BadRequest("Tourist spot not in your favorites.");
                }
            }
            else if (type.ToLower() == "placetype")
            {
                var filterPlaceType = userFavorite.Where(f => f.PlaceType?.Name.ToLower() == name.ToLower()).ToList();

                if (filterPlaceType.Count() == 1)
                {
                    await _faveRepo.DeleteFavorite(appUser, name);
                    return Ok("Place type removed from favorites.");
                }
                else
                {
                    return BadRequest("Place type not in your favorites.");
                }
            }
                return Ok();
            }
        }
    }