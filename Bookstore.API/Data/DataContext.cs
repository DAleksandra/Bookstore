using Bookstore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderBook> OrderedBooks { get; set; }
        public DbSet<FavouriteBook> FavouriteBooks { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Banner> Banners { get; set; }
    }
}