using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/tourist-spot")]
    [ApiController]
    public class TouristSpotController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITouristSpotRepository _spotRepo;
        public TouristSpotController(ApplicationDBContext context, ITouristSpotRepository spotRepo)
        {
            _context = context;
            _spotRepo = spotRepo;
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
        public async Task<IActionResult> Create([FromBody] CreateTouristSpotRequestDto touristSpotDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpotModel = touristSpotDto.ToTouristSpotFromCreatetDto();
            await _spotRepo.CreateAsync(touristSpotModel);
            return CreatedAtAction(nameof(GetById), new { id = touristSpotModel.Id }, touristSpotModel.ToTouristSpotDto());
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

            var touristSpot = await _spotRepo.DeleteAsync(id);

            if (touristSpot == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}