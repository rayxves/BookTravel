using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Repository
{
    public class TouristSpotValidator : ITouristSpotRequestValidator
    {
        public IActionResult ValidateLocationRequest(double latitude, double longitude, int? priceLevel, decimal? minRating)
        {
            if (latitude < -90 || latitude > 90)
                return new BadRequestObjectResult("Latitude must be between -90 and 90.");
            if (longitude < -180 || longitude > 180)
                return new BadRequestObjectResult("Longitude must be between -180 and 180.");
            if (priceLevel.HasValue && priceLevel.Value < 0)
                return new BadRequestObjectResult("Min price must be greater than or equal to zero.");

            if (minRating.HasValue && (minRating.Value < 0 || minRating.Value > 5))
                return new BadRequestObjectResult("The minimum rating must be between 0 and 5.");

            return null;
        }

        public IActionResult ValidateNameRequest(string name, int? priceLevel, decimal? minRating)
        {
            if (string.IsNullOrEmpty(name))
                return new BadRequestObjectResult("Parameter name is required.");

            return ValidateLocationRequest(0, 0, priceLevel, minRating);
        }
    }
}
