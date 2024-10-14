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
        private readonly ICommentRepository _commentRepo;
        private readonly GooglePlacesServices _googleServices;

        public PlacesTypeController(ITouristSpotRepository spotRepo, IPlaceTypeRepository placeRepo, ICommentRepository commentRepo, GooglePlacesServices googleServices)
        {
            _spotRepo = spotRepo;
            _placeRepo = placeRepo;
            _commentRepo = commentRepo;
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

            var touristSpot = await _spotRepo.GetByNameAsync(placeTypeDto.TouristSpotName);

            if (touristSpot == null)
            {
                var touristSpotDetails = await _googleServices.GetPlaceDetailsByName(placeTypeDto.TouristSpotName);
                if (touristSpotDetails == null) return NotFound("Tourist Spot not found in Google Places API.");

                var newTouristSpot = new TouristSpot
                {
                    Name = touristSpotDetails.Name,
                    Description = touristSpotDetails.Description,
                    Rating = touristSpotDetails.Rating,
                    PhotoUrls = touristSpotDetails.Photos
                };

                await _spotRepo.CreateAsync(newTouristSpot);
                touristSpot = newTouristSpot;
            }

            var placeTypeDetails = await _googleServices.GetPlaceDetailsByName(placeTypeDto.Name);

            if (placeTypeDetails == null) return NotFound("Place Type not found in specified Tourist Spot.");

            var placeType = new PlaceType
            {
                Name = placeTypeDetails.Name,
                Description = placeTypeDetails.Description,
                Rating = placeTypeDetails.Rating,
                PhotoUrls = placeTypeDetails.Photos,
                TouristSpotId = touristSpot.Id
            };

            var createdPlaceType = await _placeRepo.CreateAsync(placeType);

            return CreatedAtAction(nameof(GetById), new { id = createdPlaceType.Id }, createdPlaceType.ToPlaceTypeDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePlaceTypeRequestDto updatePlaceType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeTypeModel = await _placeRepo.UpdateAsync(id, updatePlaceType);

            if (placeTypeModel == null)
            {
                return NotFound();
            }

            return Ok(placeTypeModel.ToPlaceTypeDto());
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeTypeModel = await _placeRepo.GetByIdAsync(id);

            if (placeTypeModel == null)
            {
                return NotFound();
            }

            var comments = placeTypeModel.Comments;

            if (comments != null)
            {
                for (int i = 0; i < comments.Count; i++)
                {
                    await _commentRepo.DeleteAsync(comments[i].Id);
                }
            }

            await _placeRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}
