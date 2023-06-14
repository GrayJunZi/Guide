using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _ctx;

    public CategoriesController(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    [HttpGet]
    public async Task<IEnumerable<Category>> All() => await _ctx.Categories.ToListAsync();

    [HttpGet("{id}")]
    public async Task<Category> Get(string id) => await _ctx.Categories.FirstOrDefaultAsync(x => x.Id.Equals(id,StringComparison.InvariantCultureIgnoreCase));

    [HttpGet("{id}/tricks")]
    public async Task<IEnumerable<TrickCategory>> ListCategoryTricks(string id) =>
        await _ctx.TrickCategories
            .Include(x=>x.Trick)
            .Where(x => x.TrickId.Equals(id, StringComparison.InvariantCultureIgnoreCase))
            .ToListAsync();

    [HttpPost]
    public async Task<Category> Create([FromBody] Category category)
    {
        category.Id = category.Name.Replace(" ", "-").ToLowerInvariant();
        _ctx.Add(category);
        await _ctx.SaveChangesAsync();
        return category;
    }

}