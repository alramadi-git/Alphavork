namespace Database.Entities;

public class LocationEntity
{
    public Guid Uuid { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
}