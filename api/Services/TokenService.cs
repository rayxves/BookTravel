using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;

namespace api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly IHttpContextAccessor _httpContextAccessor; //acessa o conteto http atual

        public TokenService(IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _httpContextAccessor = httpContextAccessor;
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(_config["JWT:SigningKey"]));
        }

        public string CreateToken(User user)
        {
            var httpContext = _httpContextAccessor.HttpContext; //o http context tem todas as informações sobre a req http atual

            if (httpContext == null)
            {
                throw new InvalidOperationException("HttpContext não está disponível.");
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, 
                Secure = false, 
                SameSite = SameSiteMode.Strict, 
                Expires = DateTime.UtcNow.AddDays(7)
            };

            httpContext.Response.Cookies.Append("jwt", jwtToken, cookieOptions);

            return jwtToken;
        }
    }
}
