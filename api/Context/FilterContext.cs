namespace Context;
using Strategies;

public class FilterContext
{
    private IFilterStrategy _strategy;

    public void SetStrategy(IFilterStrategy strategy)
    {
        _strategy = strategy;
    }

    public string ApplyFilter(string baseUrl)
    {
        if (_strategy == null)
            throw new InvalidOperationException("No filter strategy set.");

        return _strategy.ApplyFilter(baseUrl);
    }
}
