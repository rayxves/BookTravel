
namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Favorite> Favorites {get; set;}= new List<Favorite>();
    }
}