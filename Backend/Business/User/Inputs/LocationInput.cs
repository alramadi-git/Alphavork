namespace Business.User.Inputs;

public class LocationInput
{
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }
}