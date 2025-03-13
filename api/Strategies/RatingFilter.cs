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
        return $"{baseUrl}&minrating={_rating}";
    }
}
