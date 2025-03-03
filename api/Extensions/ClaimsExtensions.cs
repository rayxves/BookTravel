using System.Security.Claims;

namespace api.Extensions
{
    public static class ClaimsExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            if (user == null || user.Claims == null)
            {
                return null;
            }

            var usernameClaim = user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"));

            return usernameClaim?.Value;
        }
    }
}