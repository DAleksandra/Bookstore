namespace Bookstore.API.DTOs
{
    public class UserForRegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
        public string Email { get; set; }
    }
}