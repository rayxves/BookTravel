using Filters;

namespace api.Services;

public class FilterService
{
    public FilterContext CreateFilterContext(int? priceLevel, decimal? minRating, string type)
    {
        var filters = new List<IFilter>();
        if (priceLevel.HasValue) filters.Add(new PriceFilter(priceLevel.Value));
        if (minRating.HasValue) filters.Add(new RatingFilter(minRating.Value));
        if (!string.IsNullOrEmpty(type)) filters.Add(new TypeFilter(type));

        var filterContext = new FilterContext();
        filters.ForEach(filter => filterContext.AddFilter(filter));

        return filterContext;
    }
}
