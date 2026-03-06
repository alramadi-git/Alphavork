using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class SamePasswordException() : AbstractException(
    StatusCodes.Status400BadRequest,
    "New password must be different from your current password.",
    "Please choose a password you have not used before on this account."
);
