using TrickingLibrary.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<TrickyStore>();

builder.Services.AddCors(options=>options.AddPolicy("All",build=>build
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("All");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
