namespace Business.User.Inputs;

public class UpdateAccountInput
{
    public required LocationInput Location { get; set; }
    public required string Username { get; set; }
    public required DateOnly Birthday { get; set; }
    public required string PhoneNumber { get; set; }
}