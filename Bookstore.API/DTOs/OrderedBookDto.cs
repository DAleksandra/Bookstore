using System;
using Bookstore.API.Models;

namespace Bookstore.API.DTOs
{
    public class OrderedBookDto
    {
        public int Quantity { get; set; }
        public int BookId { get; set; }
        public BookToReturnDto Book { get; set; }

    }
}