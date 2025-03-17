using api.Dtos;

namespace Filters
{
    public class PriceFilter : IFilter
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

        public List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places)
        {
            return places;
        }
    }
}
