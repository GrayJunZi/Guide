using Microsoft.AspNetCore.Mvc;
using TrickingLibrary.Api.Models;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricksController : ControllerBase
{
    private readonly TrickyStore _store;

    public TricksController(TrickyStore store)
    {
        _store = store;
    }

    [HttpGet]
    public IActionResult All() => Ok(_store.All);

    [HttpGet("{id}")]
    public IActionResult Get(int id) => Ok(_store.All.FirstOrDefault(x => x.Id.Equals(id)));

    [HttpPost]
    public IActionResult Create([FromBody] Trick trick)
    {
        _store.Add(trick);
        return Ok();
    }
}