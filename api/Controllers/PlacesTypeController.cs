using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/places-type")]
    [ApiController]
    public class PlacesTypeController : ControllerBase
    {
        private readonly ITouristSpotRepository _spotRepo;
        private readonly IPlaceTypeRepository _placeRepo;
        private readonly GooglePlacesServices _googleServices;

        public PlacesTypeController(ITouristSpotRepository spotRepo, IPlaceTypeRepository placeRepo, GooglePlacesServices googleServices)
        {
            _spotRepo = spotRepo;
            _placeRepo = placeRepo;
            _googleServices = googleServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PlaceTypeQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placesTypes = await _placeRepo.GetAllAsync(query);
            if (placesTypes == null) return NotFound();

            var placesTypesDto = placesTypes.Select(pt => pt.ToPlaceTypeDto()).ToList();
            return Ok(placesTypesDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var placeType = await _placeRepo.GetByIdAsync(id);
            if (placeType == null) return NotFound();

            return Ok(placeType.ToPlaceTypeDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlaceTypeRequestDto placeTypeDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var touristSpot = await _spotRepo.GetByNameAsync(placeTypeDto.Name);

            if (touristSpot == null)
            {
                var placeDetails = await _googleServices.GetPlaceDetailsByName(placeTypeDto.Name);
                if (placeDetails == null) return NotFound("Tourist Spot not found in Google Places API.");

                var newTouristSpot = new TouristSpot
                {
                    Name = placeDetails.Name,
                    Description = placeDetails.Description,
                    Rating = placeDetails.Rating,
                    PhotoUrls = placeDetails.Photos
                };

                await _spotRepo.CreateAsync(newTouristSpot);
                touristSpot = newTouristSpot;

            }

            var placeTypeModel = placeTypeDto.ToPlaceTypeFromCreatetDto();
            placeTypeModel.TouristSpotId = touristSpot.Id;
            await _placeRepo.CreateAsync(placeTypeModel);
            return CreatedAtAction(nameof(GetById), new { id = placeTypeModel.Id }, placeTypeModel.ToPlaceTypeDto());
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            var placeType = await _placeRepo.DeleteAsync(id);
            if (placeType == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
