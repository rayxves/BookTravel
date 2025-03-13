namespace Strategies;
public class PriceFilter : IFilterStrategy
{
    private readonly int _minPrice;
    private readonly int _maxPrice;

    public PriceFilter(int minPrice, int maxPrice)
    {
        _minPrice = minPrice;
        _maxPrice = maxPrice;
    }

    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&minprice={_minPrice}&maxprice={_maxPrice}";
    }
}
