using api.Dtos;

namespace Filters
{
    public class PriceFilter : IFilter
    {
        private readonly int _priceLevel;


        public PriceFilter(int priceLevel)
        {
            _priceLevel = priceLevel;
        }

        public string ApplyFilter(string baseUrl)
        {
            return $"{baseUrl}&minprice={_priceLevel}";
        }

        public List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places)
        {
            return places;
        }
    }
}
