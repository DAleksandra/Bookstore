using System.Threading.Tasks;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register (User user, string password);
        Task<User> Login (string username, string password);
        Task<User> ChangePassword(string username, string currentPassword, string newPassword);
        Task<bool> UserExists(string username);
    }
}