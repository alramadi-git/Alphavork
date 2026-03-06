using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class AccountNotRegisteredException() : AbstractException(
    StatusCodes.Status404NotFound,
    "Account not registered.",
    "No account found with the provided details. Please check your credentials or create a new account."
);
