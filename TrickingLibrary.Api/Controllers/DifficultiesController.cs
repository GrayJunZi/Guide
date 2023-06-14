using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DifficultiesController : ControllerBase
{
    private readonly AppDbContext _ctx;

    public DifficultiesController(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    [HttpGet]
    public async Task<IEnumerable<Difficulty>> All() => await _ctx.Difficulties.ToListAsync();

    [HttpGet("{id}")]
    public async Task<Difficulty> Get(string id) =>
        await _ctx.Difficulties.FirstOrDefaultAsync(x => x.Id.Equals(id, StringComparison.InvariantCultureIgnoreCase));

    [HttpGet("{id}/tricks")]
    public async Task<IEnumerable<Trick>> ListDifficultyTricks(string id) =>
        await _ctx.Tricks
            .Where(x => x.Difficulty.Equals(id, StringComparison.InvariantCultureIgnoreCase))
            .ToListAsync();

    [HttpPost]
    public async Task<Difficulty> Create([FromBody] Difficulty difficulty)
    {
        difficulty.Id = difficulty.Name.Replace(" ", "-").ToLowerInvariant();
        _ctx.Add(difficulty);
        await _ctx.SaveChangesAsync();
        return difficulty;
    }
}