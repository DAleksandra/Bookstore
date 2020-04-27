using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public class OrderBook
    {
        public int Id { get; set; }
        public int? Quantity { get; set; }
        public Book Book { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}