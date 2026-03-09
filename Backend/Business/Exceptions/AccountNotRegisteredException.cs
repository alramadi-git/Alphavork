using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class AccountNotRegisteredException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.AccountNotRegistered,
    "No account found with the provided details. Please check your credentials or create a new account."
);
