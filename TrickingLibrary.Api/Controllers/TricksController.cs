using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrickingLibrary.Api.ViewModels;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricksController : ControllerBase
{
    private readonly AppDbContext _ctx;

    public TricksController(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    [HttpGet]
    public async Task<IEnumerable<object>> All() => await _ctx.Tricks.Select(TrickViewModel.Default).ToListAsync();

    [HttpGet("{id}")]
    public async Task<object> Get(string id) =>
        await _ctx.Tricks
            .Where(x => x.Id.Equals(id, StringComparison.InvariantCultureIgnoreCase))
            .Select(TrickViewModel.Default)
            .FirstOrDefaultAsync();

    [HttpGet("{trickId}/submissions")]
    public async Task<IEnumerable<Submission>> GetSubmissions(string trickId) =>
        await _ctx.Submissions.Where(x => x.TrickId.Equals(trickId, StringComparison.InvariantCultureIgnoreCase))
            .ToListAsync();

    [HttpPost]
    public async Task<object> Create([FromBody] TrickForm trickForm)
    {
        var trick = new Trick
        {
            Id = trickForm.Name.Replace(" ", "-").ToLowerInvariant(),
            Name = trickForm.Name,
            Description = trickForm.Description,
            Difficulty = trickForm.Difficulty,
            TrickCategories = trickForm.Categories.Select(x => new TrickCategory { CategoryId = x }).ToList()
        };
        _ctx.Add(trick);
        await _ctx.SaveChangesAsync();
        return TrickViewModel.Default.Compile().Invoke(trick);
    }

    [HttpPut]
    public async Task<object> Update([FromBody] Trick trick)
    {
        if (string.IsNullOrWhiteSpace(trick.Id))
        {
            return null;
        }

        _ctx.Update(trick);
        await _ctx.SaveChangesAsync();
        return TrickViewModel.Default.Compile().Invoke(trick);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string id)
    {
        var trick = await _ctx.Tricks.FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (trick == null)
        {
            return NotFound();
        }

        trick.Deleted = true;
        _ctx.Update(trick);
        await _ctx.SaveChangesAsync();
        return Ok();
    }
}