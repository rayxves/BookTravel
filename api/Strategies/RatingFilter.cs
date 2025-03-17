using api.Dtos;

namespace Strategies;

public class RatingFilter : IFilterStrategy
{
    private readonly double _rating;

    public RatingFilter(double rating)
    {
        _rating = rating;
    }

    public string ApplyFilter(string baseUrl)
    {
        return baseUrl;
    }

    public List<GoogleTouristSpot> FilterByRating(List<GoogleTouristSpot> places)
    {
        return places.Where(place => place.Rating >= _rating).ToList();
    }
}
