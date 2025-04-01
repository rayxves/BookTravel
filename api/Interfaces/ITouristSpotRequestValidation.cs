using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface ITouristSpotRequestValidator
    {
        IActionResult ValidateLocationRequest(double latitude, double longitude, int? minPrice, int? maxPrice, decimal? minRating);
        IActionResult ValidateNameRequest(string name, int? minPrice, int? maxPrice, decimal? minRating);
    }
}
