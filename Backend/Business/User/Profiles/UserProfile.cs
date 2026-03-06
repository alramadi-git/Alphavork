using AutoMapper;

using Business.User.Models;

namespace Business.User.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<(Database.Entities.UserEntity, Database.Entities.UserSettingsEntity), UserModel>()
        .ForMember(dest => dest.Uuid, opt => opt.MapFrom(src => src.Item1.Uuid))
        .ForPath(dest => dest.Settings.IsEmailVerified, opt => opt.MapFrom(src => src.Item2.IsEmailVerified))
        .ForPath(dest => dest.Settings.EmailVerifiedAt, opt => opt.MapFrom(src => src.Item2.EmailVerifiedAt))
        .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Item1.Avatar == null ? null : src.Item1.Avatar.Url))
        .ForPath(dest => dest.Location.Country, opt => opt.MapFrom(src => src.Item1.Location.Country))
        .ForPath(dest => dest.Location.City, opt => opt.MapFrom(src => src.Item1.Location.City))
        .ForPath(dest => dest.Location.Street, opt => opt.MapFrom(src => src.Item1.Location.Street))
        .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Item1.Username))
        .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.Item1.Birthday))
        .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Item1.PhoneNumber))
        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Item1.Email))
        .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.Item1.UpdatedAt))
        .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.Item1.CreatedAt));
    }
}