using Business.Exceptions.Enums;

namespace Business.Models;

public class ExceptionModel
{
    public int StatusCode { get; set; }
    public ExceptionTypeEnum ExceptionType { get; set; }
    public string Help { get; set; }
}