using Microsoft.AspNetCore.Mvc;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public string Index()
    {
        return "Hello, World!";
    }
}