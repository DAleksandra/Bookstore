using Bookstore.API.Models;

namespace Bookstore.API.DTOs
{
    public class FavouriteForReturnDto
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}