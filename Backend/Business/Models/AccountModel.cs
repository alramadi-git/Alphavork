namespace Business.Models;

public class AccountModel<TAccount>
{
    public TAccount Account { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
}