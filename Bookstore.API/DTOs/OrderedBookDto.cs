using System;
using Bookstore.API.Models;

namespace Bookstore.API.DTOs
{
    public class OrderedBookDto
    {
        public int Quantity { get; set; }
        public Book Book { get; set; }

    }
}