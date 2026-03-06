using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public abstract class AbstractException(int statusCode, string message, string help) : Exception(message)
{
    public int StatusCode { get; set; } = statusCode;
    public string Help { get; set; } = help;
}
