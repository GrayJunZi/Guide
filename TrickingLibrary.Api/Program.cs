using Microsoft.EntityFrameworkCore;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Dev"));

builder.Services.AddCors(options => options.AddPolicy("All", build => build
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        ctx.Add(new Difficulty { Id = "easy", Name = "Easy", Description = "Easy Test" });
        ctx.Add(new Difficulty { Id = "medium", Name = "Medium", Description = "Medium Test" });
        ctx.Add(new Difficulty { Id = "hard", Name = "Hard", Description = "Hard Test" });
        ctx.Add(new Category { Id = "kick", Name = "Kick", Description = "Kick Test" });
        ctx.Add(new Category { Id = "flip", Name = "Flip", Description = "Flip Test" });
        ctx.Add(new Category { Id = "transition", Name = "Transition", Description = "Transition Test" });
        ctx.Add(new Trick
        {
            Id = "backwards-roll",
            Name = "Backwards Roll",
            Description = "This is test data",
            Difficulty = "easy",
            TrickCategories = new List<TrickCategory> { new TrickCategory { CategoryId = "flip" } }
        });
        ctx.Add(new Trick
        {
            Id = "back-flip",
            Name = "Back Flip",
            Description = "This is test data",
            Difficulty = "medium",
            TrickCategories = new List<TrickCategory> { new TrickCategory { CategoryId = "flip" } },
            Prerequisites = new List<TrickRelationship> { new TrickRelationship { PrerequisiteId = "backwards-roll" } }
        });
        ctx.SaveChanges();
    }


    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("All");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();