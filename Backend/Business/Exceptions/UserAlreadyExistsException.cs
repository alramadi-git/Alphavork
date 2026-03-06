using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class UserAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    "User already exists.",
    "An account with this email address or phone number already exists. Please use different details or log in."
);
