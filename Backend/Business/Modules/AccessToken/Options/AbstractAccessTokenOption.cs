namespace Business.Modules.AccessToken.Options;

public abstract class AbstractAccessTokenOption
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int Expires { get; set; }
    public string SecretKey { get; set; }
}