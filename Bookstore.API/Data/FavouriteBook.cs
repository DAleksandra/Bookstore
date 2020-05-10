using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public class FavouriteBook
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}