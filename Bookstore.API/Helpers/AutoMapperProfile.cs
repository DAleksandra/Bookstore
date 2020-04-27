using AutoMapper;
using Bookstore.API.Data;
using Bookstore.API.DTOs;
using Bookstore.API.Models;

namespace Bookstore.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookToReturnDto>();
            CreateMap<User, UserForRegisterDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForLoginDto>();
            CreateMap<User, UserToReturnDto>();
            CreateMap<UserForLoginDto, User>();
            CreateMap<OrderToCreation, Order>();
            CreateMap<OrderedBookDto, OrderBook>();
            CreateMap<AddressToCreationDto, Address>();
            CreateMap<Address, AddressToReturnDto>();
        }
    }
}