using AutoMapper;
using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [ApiController]
    [Route("api/{userId}/[controller]")]
    public class OrdersController
    {
        public IMapper _mapper { get; }
        public IBookRepository _repo { get; }

        public OrdersController(IBookRepository repo, IMapper mapper)     
        {
            _repo = repo;
            _mapper = mapper;
        }   
        
    }
}