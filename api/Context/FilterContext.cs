namespace Context;

using api.Dtos;
using Strategies;

public class FilterContext
{
    private IFilterStrategy _strategy;

    public void SetStrategy(IFilterStrategy strategy)
    {
        _strategy = strategy;
    }

    public string ApplyFilter(string baseUrl)
    {
        if (_strategy == null)
            throw new InvalidOperationException("No filter strategy set.");

        return _strategy.ApplyFilter(baseUrl);
    }

    public List<GoogleTouristSpot> ApplyRatingFilter(List<GoogleTouristSpot> places)
    {
        if (_strategy is RatingFilter ratingFilter)
        {
            return ratingFilter.FilterByRating(places);
        }

        return places;
    }
}
