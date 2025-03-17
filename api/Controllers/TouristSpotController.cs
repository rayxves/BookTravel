using System.Text.Json;
using System.Text.Json.Serialization;
using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Filters;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/tourist-spot")]
    [ApiController]
    public class TouristSpotController : ControllerBase
    {

        private readonly ITouristSpotRepository _spotRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly GooglePlacesServices _googleServices;
        private readonly ITouristSpotRequestValidator _validator;
        private readonly FilterService _filterService;


        public TouristSpotController(ApplicationDBContext context, ITouristSpotRepository spotRepo, ICommentRepository commentRepo, GooglePlacesServices googleServices, ITouristSpotRequestValidator validator, FilterService filterService)
        {
            _spotRepo = spotRepo;
            _commentRepo = commentRepo;
            _googleServices = googleServices;
            _validator = validator;
            _filterService = filterService;

        }

        [HttpGet]
        public async Task<IActionResult> GetALL([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpots = await _spotRepo.GetAllAsync(query);

            if (touristSpots == null)
            {
                return NotFound();
            }

            var touristSpotDto = touristSpots.Select(ts => ts.ToTouristSpotDto()).ToList();
            return Ok(touristSpotDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpot = await _spotRepo.GetByIdAsync(id);

            if (touristSpot == null)
            {
                return NotFound();
            }

            return Ok(touristSpot.ToTouristSpotDto());
        }


        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Create(string touristSpotName)
        {
            if (touristSpotName == null)
            {
                return BadRequest("Invalid tourist spot data.");
            }

            var existingTouristSpot = await _spotRepo.GetByNameAsync(touristSpotName);
            if (existingTouristSpot != null)
            {
                return BadRequest("Cannot add the same Tourist Spot.");
            }

            var touristSpotDetails = await _googleServices.GetPlaceDetailsByName(touristSpotName);

            if (touristSpotDetails == null) return NotFound("Tourist Spot not found in Google Places API.");

            var touristSpot = new TouristSpot
            {
                Name = touristSpotDetails.Name,
                Description = touristSpotDetails.Description,
                Rating = touristSpotDetails.Rating,
                PhotoUrls = touristSpotDetails.Photos
            };

            var createdTouristSpot = await _spotRepo.CreateAsync(touristSpot);


            return CreatedAtAction(nameof(GetById), new { id = createdTouristSpot.Id }, createdTouristSpot);
        }

        [HttpGet("by-location")]
        public async Task<IActionResult> GetPlacesByLocation(
           [FromQuery] double latitude,
           [FromQuery] double longitude,
           [FromQuery] int? minPrice,
           [FromQuery] int? maxPrice,
           [FromQuery] double? minRating,
           [FromQuery] string type)
        {
            var validationError = _validator.ValidateLocationRequest(latitude, longitude, minPrice, maxPrice, minRating);
            if (validationError != null) return validationError;

            var filterContext = _filterService.CreateFilterContext(minPrice, maxPrice, minRating, type);

            var response = await _googleServices.GetPlacesByLocationAsync(filterContext, latitude, longitude);

            if (response == null || response.Results == null || response.Results.Count == 0)
            {
                return NotFound("No places found with the criteria specified.");
            }

            return Ok(response);
        }

        [HttpGet("by-name")]
        public async Task<IActionResult> GetPlacesByName(
            [FromQuery] string name,
            [FromQuery] int? minPrice,
            [FromQuery] int? maxPrice,
            [FromQuery] double? minRating,
            [FromQuery] string type)
        {
            var validationError = _validator.ValidateNameRequest(name, minPrice, maxPrice, minRating);
            if (validationError != null) return validationError;

            var filterContext = _filterService.CreateFilterContext(minPrice, maxPrice, minRating, type);

            var response = await _googleServices.GetPlacesByNameAsync(filterContext, name);

            if (response == null || response.Results == null || response.Results.Count == 0)
            {
                return NotFound("No places found with the criteria specified.");
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTouristSpotRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpotModel = await _spotRepo.UpdateAsync(id, updateDto);

            if (touristSpotModel == null)
            {
                return NotFound();
            }

            return Ok(touristSpotModel.ToTouristSpotDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpotModel = await _spotRepo.GetByIdAsync(id);

            if (touristSpotModel == null)
            {
                return NotFound();
            }
            var comments = touristSpotModel.Comments;


            if (comments != null)
            {
                for (int i = 0; i < comments.Count; i++)
                {
                    await _commentRepo.DeleteAsync(comments[i].Id);
                }
            }


            await _spotRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}