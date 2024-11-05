using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/tourist-spot")]
    [ApiController]
    public class TouristSpotController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITouristSpotRepository _spotRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly GooglePlacesServices _googleServices;

        public TouristSpotController(ApplicationDBContext context, ITouristSpotRepository spotRepo, ICommentRepository commentRepo, GooglePlacesServices googleServices)
        {
            _context = context;
            _spotRepo = spotRepo;
            _commentRepo = commentRepo;
            _googleServices = googleServices;
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
            if (touristSpotDto == null)
            {
                return BadRequest("Invalid tourist spot data.");
            }

            var touristSpotDetails = await _googleServices.GetPlaceDetailsByName(touristSpotDto.Name);
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
            var placeTypes = touristSpotModel.PlaceTypes;

            if (comments != null)
            {
                for (int i = 0; i < comments.Count; i++)
                {
                    await _commentRepo.DeleteAsync(comments[i].Id);
                }
            }

            if (placeTypes != null)
            {
                for (int i = 0; i < placeTypes.Count; i++)
                {
                    await _commentRepo.DeleteAsync(placeTypes[i].Id);
                }
            }

            await _spotRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}