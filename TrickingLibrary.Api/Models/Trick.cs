namespace TrickingLibrary.Api.Models;

public class Trick
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class TrickyStore
{
    private List<Trick> _tricks;
    public TrickyStore()
    {
        _tricks = new List<Trick>();
    }

    public IEnumerable<Trick> All => _tricks;

    public void Add(Trick trick)
    {
        trick.Id = _tricks.Count + 1;
        _tricks.Add(trick);
    }
}