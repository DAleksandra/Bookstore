namespace Bookstore.API.DTOs
{
    public class AddressToReturnDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string HomeNumber { get; set; }
        public string PostNumber { get; set; }
        public string City { get; set; }
    }
}