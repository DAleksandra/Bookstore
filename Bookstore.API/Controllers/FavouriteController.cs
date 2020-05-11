using System;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using System.Linq;
using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Bookstore.API.DTOs;
using Bookstore.API.Models;
using System.Threading.Tasks;

namespace Bookstore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/{userId}/[controller]")]
    public class FavouriteController : ControllerBase
    {
        public IMapper _mapper { get; }
        public IBookRepository _repo { get; }
        public FavouriteController(IBookRepository repo, IMapper mapper)     
        {
            _repo = repo;
            _mapper = mapper;
        }   

        [HttpPost]
        public async Task<IActionResult> AddFavourite(int userId, FavouriteForCreationDto favouriteForCreation)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var favourite = _mapper.Map<FavouriteBook>(favouriteForCreation);
            userFromRepo.FavouriteBook.Add(favourite);

            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add to favourite.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var favouriteFromRepo = await _repo.GetFavourite(id, userId);

            _repo.Delete(favouriteFromRepo);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete from favourite.");

        }   
        [HttpGet]
        public async Task<IActionResult> GetFavourites(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var favouritesFromRepo = await _repo.GetFavourites(userId);

            var favourites = _mapper.Map<IEnumerable<FavouriteForReturnDto>>(favouritesFromRepo);

            return Ok(favourites);
        }
    }
}