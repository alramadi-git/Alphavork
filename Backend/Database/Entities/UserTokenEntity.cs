namespace Database.Entities;

public class UserTokenEntity
{
    public Guid Uuid { get; set; }
    public Guid UserUuid { get; set; }
    public UserEntity User { get; set; }
    public Guid TokenUuid { get; set; }
    public TokenEntity Token { get; set; }

}