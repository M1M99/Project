using FinalAspReactAuction.Server.Controllers;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Repository;
using FinalAspReactAuction.Server.Services.Abstract;
using FinalAspReactAuction.Server.Services.Concrete;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); // include edeceksense burani islet
builder.Services.AddScoped<ICarService, CarService>();

var conn = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlServer(conn);
});
builder.Services.AddCors(p => p.AddPolicy("cors", builder =>
{
    builder.WithOrigins("https://localhost:50007")
    .AllowAnyMethod()
    .AllowAnyHeader();
}));
builder.Services.AddScoped<BrandController>();
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(x => x
.AllowAnyMethod()
.AllowAnyHeader()
.SetIsOriginAllowed(origin => true)
.AllowCredentials());
app.Run();
