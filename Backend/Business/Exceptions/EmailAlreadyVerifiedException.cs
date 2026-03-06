using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class EmailAlreadyVerifiedException() : AbstractException(
    StatusCodes.Status409Conflict,
    "Email is already verified.",
    "Your email address is already verified. No further action is needed."
);
