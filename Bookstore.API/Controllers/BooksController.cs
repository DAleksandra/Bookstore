using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bookstore.API.Data;
using Bookstore.API.DTOs;
using Bookstore.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        public IMapper _mapper { get; }
        public IBookRepository _repo { get; }
    
        public BooksController(IBookRepository repo, IMapper mapper)     
        {
            _repo = repo;
            _mapper = mapper;
        }   

        [HttpGet("{id}", Name="GetBook")]
        public async Task<IActionResult> GetBook(int id)
        {
            var bookFromRepo = await _repo.GetBook(id);
            var book = _mapper.Map<BookToReturnDto>(bookFromRepo);
      

            return Ok(book);
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery]Filters dateFilter)
        {
            var booksFromRepo = await _repo.GetBooks(dateFilter);
            var books = _mapper.Map<ICollection<Book>>(booksFromRepo);

            return Ok(books);
        }
    }
}