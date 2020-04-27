using System.Collections.Generic;

namespace Bookstore.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Address>? Addresses { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        
    }
}