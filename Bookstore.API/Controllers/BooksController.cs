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
            if(dateFilter.BookName == null)
                dateFilter.BookName = "";
            var booksFromRepo = await _repo.GetBooks(dateFilter);
            var books = _mapper.Map<ICollection<Book>>(booksFromRepo);

            return Ok(books);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchedBooks([FromQuery]string bookName)
        {
            var booksFromRepo = await _repo.GetSearchedBooks(bookName);
            var books = _mapper.Map<ICollection<Book>>(booksFromRepo);

            return Ok(books);
        }

        [HttpGet("bestsellers")]
        public async Task<IActionResult> GetBestsellers()
        {
            var booksFromRepo = await _repo.GetBestsellers();

            return Ok(booksFromRepo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveBook(int id)
        {
            var bookFromRepo = await _repo.GetBook(id);

            _repo.Delete(bookFromRepo);

            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete book.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, BookToCreateDto bookForUpdateDto)
        {
            var bookFromRepo = await _repo.GetBook(id);

            _mapper.Map(bookForUpdateDto, bookFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not update book.");
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(BookToCreateDto bookForCreation)
        {
            var book = _mapper.Map<Book>(bookForCreation);

            _repo.Add(book);

            if(await _repo.SaveAll())
            {
                var bookToReturn = _mapper.Map<BookToReturnDto>(book);
                return CreatedAtRoute("GetBook", new {id = book.Id}, bookToReturn);
            }

            return BadRequest("Could not add the book.");
        }

        
    }
}