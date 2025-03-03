using api.Dtos;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICommentRepository _commentRepo;
        private readonly ITouristSpotRepository _spotRepo;

        public CommentController(ICommentRepository commentRepo, ITouristSpotRepository spotRepo, UserManager<User> userManager)
        {
            _commentRepo = commentRepo;
            _spotRepo = spotRepo;

            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetALL([FromQuery] CommentQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comments = await _commentRepo.GetAllAsync(query);

            if (comments.IsNullOrEmpty())
            {
                return NotFound("You don't have any comments");
            }

            var commentsDto = comments.Select(comment => comment.ToCommentDto()).ToList();
            return Ok(commentsDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment == null)
            {
                return null;
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpGet("by-tourist-spot")]
        [Authorize]
        public async Task<IActionResult> GetALLByUser([FromQuery] string touristSpotName)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return Unauthorized("User not found");
            }

            var comments = await _commentRepo.GetAllByUserAsync(appUser.Id, touristSpotName);

            if (comments == null || comments.Count == 0)
            {
                return NotFound("You don't have any comments");
            }

            var commentsDto = comments.Select(comment => comment.ToCommentDto()).ToList();
            return Ok(commentsDto);

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var touristSpot = await _spotRepo.GetByNameAsync(commentDto.TouristSpotName);

            if (touristSpot == null)
            {
                return NotFound();
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            Comment commentModel;

            commentModel = commentDto.ToCommentFromCreatetDto(touristSpotId: touristSpot.Id);
            commentModel.TouristSpotId = touristSpot.Id;

            commentModel.UserId = appUser.Id;
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentModel = await _commentRepo.UpdateAsync(id, commentDto);
            if (commentModel == null)
            {
                return NotFound();
            }

            return Ok(commentModel.ToCommentDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepo.DeleteAsync(id);

            if (comment == null)
            {
                return NotFound();

            }

            return NoContent();
        }
    }


}
