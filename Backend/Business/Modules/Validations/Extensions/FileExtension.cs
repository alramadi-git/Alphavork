using Business.Modules.Validations.Enums;
using FluentValidation;

using Microsoft.AspNetCore.Http;

namespace Business.Modules.Validations.Extensions;

public static class FileExtension
{
    public static IRuleBuilderOptions<T, IFormFile> Type<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, FileTypeEnum type)
    {
        var mappedType = type switch
        {
            FileTypeEnum.Application => "application/",
            FileTypeEnum.Audio => "audio/",
            FileTypeEnum.Font => "font/",
            FileTypeEnum.Image => "image/",
            FileTypeEnum.Message => "message/",
            FileTypeEnum.Model => "model/",
            FileTypeEnum.Multipart => "multipart/",
            FileTypeEnum.Text => "text/",
            FileTypeEnum.Video => "video/",
            _ => throw new ArgumentOutOfRangeException(nameof(type), type, null),
        };

        return ruleBuilder
        .Must(file => file.ContentType.StartsWith(mappedType));
    }

    public static IRuleBuilderOptions<T, IFormFile> MaxKbSize<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, int size)
    {
        return ruleBuilder
        .Must(file => file.Length <= size * 1024);
    }
    public static IRuleBuilderOptions<T, IFormFile> MaxMbSize<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, int size)
    {
        return ruleBuilder
        .Must(file => file.Length <= size * 1024 * 1024);
    }
}