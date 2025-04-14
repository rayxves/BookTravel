using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface ITouristSpotRequestValidator
    {
        IActionResult ValidateLocationRequest(double latitude, double longitude, int? priceLevel, decimal? minRating);
        IActionResult ValidateNameRequest(string name, int? priceLevel, decimal? minRating);
    }
}
