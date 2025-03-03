
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}