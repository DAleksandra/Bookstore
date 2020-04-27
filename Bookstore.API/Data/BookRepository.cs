using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Models;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data
{
    public class BookRepository : IBookRepository
    {
        public DataContext _context { get; }
        public BookRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<Book> GetBook(int id)
        {
           var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

           return book;
        }

        public async Task<ICollection<Book>> GetBooks(Filters filters)
        {
            List<Book> books;
            if(filters.SortBy == "Sort by price - ascending")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Price).ToListAsync();
                }
                else
                {
                    books = await _context.Books.Where(x => (x.OnSale == filters.Sales) && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Price).ToListAsync();
                }
                
            }
            else if(filters.SortBy == "Sort by price - descending")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Price).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Price).ToListAsync();
                }
               
            }
            else if(filters.SortBy == "Sort from A-Z")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Title).ToListAsync();
                }
                else
                {
                      books = await _context.Books.Where(x => x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Title).ToListAsync();
                }
               
            }
            else if(filters.SortBy == "Sort from Z-A")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Title).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Title).ToListAsync();
                }
                
            }
            else
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).ToListAsync();
                }
                
            }

            return books;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Delete<T>(T entity)
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.Include(o => o.Orders)
            .FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }

        public async Task<ICollection<Address>> GetAddresses(int userId)
        {
           var addresses = await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();

           return addresses;


        }
    }
}