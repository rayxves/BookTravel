using api.Dtos;

namespace Filters;

public class TypeFilter : IFilter
{
    private readonly string _type;

    private static readonly List<string> ValidTypes = new List<string>
        { "restaurant", "park", "museum", "bar", "school", "hospital", "hotel", "cafe", "store" };

    public TypeFilter(string type)
    {
        if (string.IsNullOrEmpty(type) || !ValidTypes.Contains(type.ToLower()))
            throw new ArgumentException("Invalid type.");

        _type = type.ToLower();
    }

    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&type={Uri.EscapeDataString(_type)}";
    }
    public List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places)
    {
        return places;
    }
}

