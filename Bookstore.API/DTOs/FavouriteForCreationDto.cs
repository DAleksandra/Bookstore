using Bookstore.API.Models;

namespace Bookstore.API.DTOs
{
    public class FavouriteForCreationDto
    {
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}