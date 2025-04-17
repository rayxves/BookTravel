using api.Dtos;

namespace Filters;
public class FilterContext
{
    private List<IFilter> _filters = new List<IFilter>();

    public void AddFilter(IFilter filter)
    {
        _filters.Add(filter);
    }

    public string ApplyFilters(string baseUrl)
    {
        bool hasParams = baseUrl.Contains("?");
        foreach (var filter in _filters)
        {
            string param = filter.ApplyFilter("");
            if (!string.IsNullOrEmpty(param))
            {
                baseUrl += hasParams ? "&" + param.Substring(1) : param;
                hasParams = true;
            }
        }
        return baseUrl;
    }

    public List<GoogleTouristSpot> ApplyFilters(List<GoogleTouristSpot> places)
    {
        foreach (var filter in _filters)
        {
            places = filter.ApplyFilter(places);
        }
        return places;
    }
}
