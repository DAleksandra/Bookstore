using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public interface IBookRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity);
         Task<bool> SaveAll();
         Task<Book> GetBook(int id);
         Task<ICollection<Book>> GetBooks(Filters filters);
         Task<User> GetUser(int userId);
         Task<ICollection<Address>> GetAddresses(int userId);
        Task<Address> GetAddress(int userId, int id);
        Task<ICollection<Order>> GetOrders(int userId);
        Task<Order> GetOrder(int userId, int id);
        Task<ICollection<OrderBook>> GetOrderBooks(int orderId);
   

    }
}