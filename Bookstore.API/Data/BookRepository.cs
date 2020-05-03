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
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Price).ToListAsync();
                }
                else
                {
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&(x.OnSale == filters.Sales) && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Price).ToListAsync();
                }
                
            }
            else if(filters.SortBy == "Sort by price - descending")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Price).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Price).ToListAsync();
                }
               
            }
            else if(filters.SortBy == "Sort from A-Z")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Title).ToListAsync();
                }
                else
                {
                      books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderBy(x => x.Title).ToListAsync();
                }
               
            }
            else if(filters.SortBy == "Sort from Z-A")
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Title).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).OrderByDescending(x => x.Title).ToListAsync();
                }
                
            }
            else
            {
                if(filters.Sales == false)
                {
                    books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
                                                    && (x.Genre == filters.Genre || filters.Genre == "All")).ToListAsync();
                }
                else
                {
                     books = await _context.Books.Where(x => (x.Author.ToLower().Contains(filters.BookName.ToLower()) || x.Title.ToLower()
                    .Contains(filters.BookName.ToLower())) &&x.OnSale == filters.Sales && x.Price <= filters.PriceMax && x.Price >= filters.PriceMin
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
            var user = await _context.Users.Include(o => o.Orders).Include(a => a.Addresses)
            .FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }

        public async Task<ICollection<Address>> GetAddresses(int userId)
        {
           var addresses = await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();

           return addresses;


        }
        public async Task<Address> GetAddress(int userId, int id)
        {
            var address = await _context.Addresses.Where(a => a.UserId == userId && a.Id == id).FirstOrDefaultAsync();

            return address;
        }

        public async Task<ICollection<Order>> GetOrders(int userId)
        {
           var orders = await _context.Orders.Include(x => x.Books).Where(a => a.UserId == userId).ToListAsync();

           return orders;
        }
        public async Task<Order> GetOrder(int userId, int id)
        {
            var order = await _context.Orders.Where(a => a.UserId == userId && a.Id == id).FirstOrDefaultAsync();

            return order;
        }

        public async Task<ICollection<OrderBook>> GetOrderBooks(int orderId)
        {
           var orderBooks = await _context.OrderedBooks.Where(a => a.OrderId == orderId).ToListAsync();

           return orderBooks;


        }

        public async Task<Boolean> DecreaseStock(int id, int quantity)
        {
            var book = await _context.Books.Where(x => x.Id == id).FirstOrDefaultAsync();

            book.Stock = book.Stock - quantity;

            return await SaveAll();
            
        }

        public async Task<ICollection<Book>> GetBestsellers()
        {
            var books = await _context.Books.OrderByDescending(x => x.Saled).Take(4).ToListAsync();

            return books;
        }

        public async Task<ICollection<Book>> GetSearchedBooks(string filter)
        {
            var books = await _context.Books.Where(x => x.Title.ToLower().Contains(filter.ToLower()) || x.Author.ToLower().
            Contains(filter.ToLower())).Take(5).ToListAsync();

            return books;
        }
    }
}