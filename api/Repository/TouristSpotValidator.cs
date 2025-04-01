using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Repository
{
    public class TouristSpotValidator : ITouristSpotRequestValidator
    {
        public IActionResult ValidateLocationRequest(double latitude, double longitude, int? minPrice, int? maxPrice, decimal? minRating)
        {
            if (latitude < -90 || latitude > 90)
                return new BadRequestObjectResult("Latitude must be between -90 and 90.");
            if (longitude < -180 || longitude > 180)
                return new BadRequestObjectResult("Longitude must be between -180 and 180.");
            if (minPrice.HasValue && minPrice.Value < 0)
                return new BadRequestObjectResult("Min price must be greater than or equal to zero.");
            if (maxPrice.HasValue && maxPrice.Value <= 0)
                return new BadRequestObjectResult("Max price must be greater than or equal to zero.");
            if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
                return new BadRequestObjectResult("The minimum price cannot be higher than the maximum price.");
            if (minRating.HasValue && (minRating.Value < 0 || minRating.Value > 5))
                return new BadRequestObjectResult("The minimum rating must be between 0 and 5.");

            return null; 
        }

        public IActionResult ValidateNameRequest(string name, int? minPrice, int? maxPrice, decimal? minRating)
        {
            if (string.IsNullOrEmpty(name))
                return new BadRequestObjectResult("Parameter name is required.");

            return ValidateLocationRequest(0, 0, minPrice, maxPrice, minRating);
        }
    }
}
