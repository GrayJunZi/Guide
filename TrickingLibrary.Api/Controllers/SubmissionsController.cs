using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionsController : ControllerBase
{
    private readonly AppDbContext _ctx;

    public SubmissionsController(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    [HttpGet]
    public async Task<IEnumerable<Submission>> All() => await _ctx.Submissions.ToListAsync();

    [HttpGet("{id}")]
    public async Task<Submission> Get(int id) => await _ctx.Submissions.FirstOrDefaultAsync(x => x.Id.Equals(id));

    [HttpPost]
    public async Task<Submission> Create([FromBody] Submission submission)
    {
        _ctx.Add(submission);
        await _ctx.SaveChangesAsync();
        return submission;
    }

    [HttpPut]
    public async Task<Submission> Update([FromBody] Submission submission)
    {
        if (submission.Id == 0)
        {
            return null;
        }

        _ctx.Update(submission);
        await _ctx.SaveChangesAsync();
        return submission;
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var submission = await _ctx.Submissions.FirstOrDefaultAsync(x=>x.Id.Equals(id));
        if (submission == null)
        {
            return NotFound();
        }
        
        submission.Deleted = true;
        _ctx.Update(submission);
        await _ctx.SaveChangesAsync();
        return Ok();
    }
}