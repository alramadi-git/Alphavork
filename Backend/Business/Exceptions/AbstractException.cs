using Business.Exceptions.Enums;

namespace Business.Exceptions;

public abstract class AbstractException(int statusCode, ExceptionTypeEnum exceptionType, string help) : Exception()
{
    public int StatusCode { get; set; } = statusCode;
    public ExceptionTypeEnum ExceptionType { get; set; } = exceptionType;
    public string Help { get; set; } = help;
}
