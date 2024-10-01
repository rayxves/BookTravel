using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/places-type")]
    [ApiController]
    public class PlacesTypeController : ControllerBase
    {
        private readonly ITouristSpotRepository _spotRepo;
        private readonly IPlaceTypeRepository _placeRepo;
        public PlacesTypeController(ITouristSpotRepository spotRepo, IPlaceTypeRepository placeRepo)
        {
            _spotRepo = spotRepo;
            _placeRepo = placeRepo;

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetALL([FromQuery] PlaceTypeQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placesTypes = await _placeRepo.GetAllAsync(query);

            if (placesTypes == null)
            {
                return NotFound();
            }
            var placesTypesDto = placesTypes.Select(pt => pt.ToPlaceTypeDto()).ToList();

            return Ok(placesTypesDto);

        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeType = await _placeRepo.GetByIdAsync(id);

            if (placeType == null)
            {
                return NotFound();
            }

            return Ok(placeType.ToPlaceTypeDto());
        }

        [HttpPost]
        [Route("{name:alpha}")]
        public async Task<IActionResult> Create([FromRoute] string name, CreatePlaceTypeRequestDto placeTypeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpot = await _spotRepo.GetByNameAsync(name);

            if (touristSpot == null)
            {
                //falta a parte de services da api do google
                return BadRequest("Tourist Spot does not exists");
            }

            var placesTypesModel = placeTypeDto.ToPlaceTypeFromCreatetDto();
            placesTypesModel.TouristSpotId = touristSpot.Id;
            await _placeRepo.CreateAsync(placesTypesModel);
            return CreatedAtAction(nameof(GetById), new { id = placesTypesModel.Id }, placesTypesModel.ToPlaceTypeDto());

        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<IActionResult> Update([FromRoute] int id, UpdatePlaceTypeRequestDto placeTypeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeTypeModel = await _placeRepo.UpdateAsync(id, placeTypeDto);

            if (placeTypeModel == null)
            {
                return NotFound();
            }

            return Ok(placeTypeModel.ToPlaceTypeDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeType = _placeRepo.DeleteAsync(id);

            if (placeType == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}