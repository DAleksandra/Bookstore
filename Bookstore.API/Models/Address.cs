namespace Bookstore.API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string HomeNumber { get; set; }
        public string PostNumber { get; set; }
        public string City { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}