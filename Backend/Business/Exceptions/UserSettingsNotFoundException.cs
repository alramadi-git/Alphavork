using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class UserSettingsNotFoundException() : AbstractException(
    StatusCodes.Status404NotFound,
    "User settings not found.",
    "The settings for this account could not be found."
);
