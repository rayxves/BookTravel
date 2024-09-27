using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/places-type")]
    [ApiController]
    public class PlacesTypeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPlaceTypeRepository _placeRepo;
        public PlacesTypeController(ApplicationDBContext context, IPlaceTypeRepository placeRepo)
        {
            _context = context;
            _placeRepo = placeRepo;
        }

        [HttpGet]
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
    }
}