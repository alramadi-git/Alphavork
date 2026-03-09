using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class UserSettingsNotFoundException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.UserSettingsNotFound,
    "The settings for this account could not be found."
);
