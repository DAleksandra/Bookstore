using System;

namespace Bookstore.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public int Stock { get; set; }
        public float Price { get; set; }
        public bool OnSale { get; set; }
        public float SalePrice { get; set; }
        public string Language { get; set; }
        public string Publisher { get; set; }
        public string Genre { get; set; }
        public DateTime PublishingDate { get; set; }

    }
}