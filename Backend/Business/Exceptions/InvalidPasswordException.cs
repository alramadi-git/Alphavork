using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class InvalidPasswordException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    "Invalid password.",
    "The password you entered is incorrect. Please try again."
);
