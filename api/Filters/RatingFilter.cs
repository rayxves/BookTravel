using api.Dtos;

namespace Filters;

public class RatingFilter : IFilter
{
    private readonly decimal _rating;

    public RatingFilter(decimal rating)
    {
        _rating = rating;
    }

    public string ApplyFilter(string baseUrl)
    {
        return baseUrl;
    }


    public List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places)
    {

        var filtered = places.Where(place => place.Rating >= _rating).ToList();
        return filtered;
    }
}
