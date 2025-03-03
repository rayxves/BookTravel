
namespace api.Helpers
{
    public class QueryObject
    {
        public string? Name { get; set; }
        public string? SortBy { get; set; } = null;
        public bool isDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}