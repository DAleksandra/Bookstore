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

            foreach(var book in orderToCreation.Books)
            {
                book.Book.Stock = book.Book.Stock - book.Quantity;
            }


            var order = _mapper.Map<Order>(orderToCreation);

            
            userFromRepo.Orders.Add(order);

            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add the order.");
        }

        [HttpGet]
        public async Task<IActionResult> GerOrders(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var ordersFromRepo = await _repo.GetOrders(userId);

            var orders = _mapper.Map<IEnumerable<OrderToReturnDto>>(ordersFromRepo);

            return Ok(orders);
        }

        [HttpGet("worker")]
        public async Task<IActionResult> GerOrdersWorker([FromQuery]string state)
        {
            
            var ordersFromRepo = await _repo.GetOrdersWorker(state.ToLower());

            var orders = _mapper.Map<IEnumerable<OrderToReturnDto>>(ordersFromRepo);

            return Ok(orders);
        }

        [HttpGet("books")]
        public async Task<IActionResult> GerOrderBooks(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var orderBooksFromRepo = await _repo.GetOrderBooks(userId);

            var orders = _mapper.Map<IEnumerable<OrderToReturnDto>>(orderBooksFromRepo);

            return Ok(orders);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var orderFromRepo = await _repo.GetOrder(userId, id);

            if(currentUser != orderFromRepo.UserId)
                return Unauthorized();

            var order = _mapper.Map<IEnumerable<OrderToReturnDto>>(orderFromRepo);

            return Ok(order);
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

        [HttpGet("banners")]
        public async Task<IActionResult> GetBanners(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var banners = await _repo.GetBanners();

            return Ok(banners);
        }

        [HttpGet("address/{id}", Name = "GetAddress")]
        public async Task<IActionResult> GetAddress(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var addressFromRepo = await _repo.GetAddress(userId, id);

            if(currentUser != addressFromRepo.UserId)
                return Unauthorized();

            var address = _mapper.Map<IEnumerable<AddressToReturnDto>>(addressFromRepo);

            return Ok(address);
        }



        [HttpPost("address")]
        public async Task<IActionResult> AddAddress(int userId, AddressToCreationDto addressToCreation)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var address = _mapper.Map<Address>(addressToCreation);

            userFromRepo.Addresses.Add(address);

            if(await _repo.SaveAll())
            {
                var addressToReturn = _mapper.Map<AddressToReturnDto>(address);
                return CreatedAtRoute("GetAddress", new {userId = userId, id = address.Id}, addressToReturn);
            }

            return BadRequest("Could not add the adress.");
        }

        [HttpPut("address/{id}")]
        public async Task<IActionResult> UpdateAddress(int id, int userId, AddressToReturnDto addressForUpdateDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressFromRepo = await _repo.GetAddress(userId, id);

            _mapper.Map(addressForUpdateDto, addressFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not update address.");
        }

        [HttpPut("banners/{id}")]
        public async Task<IActionResult> UpdateBanner(int id, int userId, BannerForUpdateDto banner)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bannerFromRepo = await _repo.GetBanner(id);
            _mapper.Map(banner, bannerFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not update banner.");

        }

        [HttpPut("{id}")]     
        public async Task<IActionResult> UpdateOrder(int id, int userId, OrderForUpdateDto orderForUpdateDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var orderFromRepo = await _repo.GetOrder(userId, id);
           
            
            _mapper.Map(orderForUpdateDto, orderFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not update order.");
        }   

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id, int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var orderFromRepo = await _repo.GetOrder(userId, id);

            _repo.Delete(orderFromRepo);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete order.");
        }

        [HttpDelete("address/{id}")]
        public async Task<IActionResult> DeleteAddress(int id, int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if(!user.Addresses.Any(p => p.Id == id))
                return Unauthorized();

            var addressesFromRepo = await _repo.GetAddress(userId, id);

            _repo.Delete(addressesFromRepo);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete address.");
        }

    
    }
}