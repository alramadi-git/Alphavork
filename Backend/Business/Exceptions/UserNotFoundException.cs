using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class UserNotFoundException() : AbstractException(
    StatusCodes.Status404NotFound,
    "User not found.",
    "The requested user account could not be found."
);
