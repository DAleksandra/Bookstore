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
    public class OrdersController : ControllerBase
    {
        public IMapper _mapper { get; }
        public IBookRepository _repo { get; }

        public OrdersController(IBookRepository repo, IMapper mapper)     
        {
            _repo = repo;
            _mapper = mapper;
        }   

        [HttpPost]
        public async Task<IActionResult> AddOrder(int userId, OrderToCreation orderToCreation)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var order = _mapper.Map<Order>(orderToCreation);
            
            userFromRepo.Orders.Add(order);

            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add the order.");
        }

        [HttpGet("address")]
        public async Task<IActionResult> GetAddresses(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressesFromRepo = await _repo.GetAddresses(userId);

            var addresses = _mapper.Map<IEnumerable<AddressToReturnDto>>(addressesFromRepo);

            return Ok(addresses);
        }

    
    }
}