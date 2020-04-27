using System;
using System.Collections.Generic;
using Bookstore.API.Data;

namespace Bookstore.API.DTOs
{
    public class OrderToCreation
    {
        public ICollection<OrderedBookDto> Books { get; set; }
        public string Status { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string HomeNumber { get; set; }
        public string PostNumber { get; set; }
        public string City { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalPrice { get; set; }
         public OrderToCreation()
        {
            this.OrderDate = DateTime.Now;
        }

    }
}