namespace Strategies;

public class TypeFilter : IFilterStrategy
{
    private readonly string _type;

    private static readonly List<string> ValidTypes = new List<string>
        {
            "restaurant", "park", "museum", "bar", "school", "hospital", "hotel", "cafe", "store"
        };

    public TypeFilter(string type)
    {
        if (string.IsNullOrEmpty(type))
        {
            throw new ArgumentException("Type cannot be null or empty.");
        }

        if (!ValidTypes.Contains(type.ToLower()))
        {
            throw new ArgumentException("Invalid type.");
        }

        _type = type.ToLower();
    }
    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&type={_type}";
    }
}
