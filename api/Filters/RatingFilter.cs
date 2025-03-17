using api.Dtos;

namespace Filters;

public class RatingFilter : IFilter
{
    private readonly double _rating;

    public RatingFilter(double rating)
    {
        _rating = rating;
    }

    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&minrating={_rating}";
    }


    public List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places)
    {
        return places.Where(place => place.Rating >= _rating).ToList();
    }
}
