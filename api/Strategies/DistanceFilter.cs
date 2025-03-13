namespace Strategies;
public class DistanceFilter : IFilterStrategy
{
    private readonly int _radius;

    public DistanceFilter(int radius)
    {
        _radius = radius;
    }

    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&radius={_radius}";
    }
}
