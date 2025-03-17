using api.Dtos;

namespace Filters;

public interface IFilter
{
    string ApplyFilter(string baseUrl); 
    List<GoogleTouristSpot> ApplyFilter(List<GoogleTouristSpot> places); 
}
