using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public async Task<IEnumerable<Trick>> All() => await _ctx.Tricks.ToListAsync();

    [HttpGet("{id}")]
    public async Task<Trick> Get(int id) => await _ctx.Tricks.FirstOrDefaultAsync(x => x.Id.Equals(id));

    [HttpGet("{trickId}/submission")]
    public async Task<IEnumerable<Submission>> GetSubmissions(int trickId) =>
        await _ctx.Submissions.Where(x => x.TrickId.Equals(trickId)).ToListAsync();

    [HttpPost]
    public async Task<Trick> Create([FromBody] Trick trick)
    {
        _ctx.Add(trick);
        await _ctx.SaveChangesAsync();
        return trick;
    }

    [HttpPut]
    public async Task<Trick> Update([FromBody] Trick trick)
    {
        if (trick.Id == 0)
        {
            return null;
        }

        _ctx.Update(trick);
        await _ctx.SaveChangesAsync();
        return trick;
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var trick = await _ctx.Tricks.FirstOrDefaultAsync(x=>x.Id.Equals(id));
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