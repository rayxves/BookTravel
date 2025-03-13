namespace Strategies;

public class TypeFilter : IFilterStrategy
{
    private readonly string _type;

    public TypeFilter(string type)
    {
        _type = type;
    }

    public string ApplyFilter(string baseUrl)
    {
        return $"{baseUrl}&type={_type}";
    }
}
