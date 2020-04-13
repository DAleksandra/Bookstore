using AutoMapper;
using Bookstore.API.DTOs;
using Bookstore.API.Models;

namespace Bookstore.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookToReturnDto>();
        }
    }
}