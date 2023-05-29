using Microsoft.AspNetCore.Mvc;

namespace TricikingLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideosController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public VideosController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost]
    public async Task<IActionResult> UploadVideo(IFormFile video)
    {
        var mime = Path.GetExtension(video.FileName);
        var fileName = string.Concat(Path.GetRandomFileName(), mime);
        var savePath = Path.Combine(_env.WebRootPath, fileName);

        using (var fileStream = new FileStream(savePath, FileMode.Create, FileAccess.Write))
        {
            await video.CopyToAsync(fileStream);
        }

        return Ok();
    }
}