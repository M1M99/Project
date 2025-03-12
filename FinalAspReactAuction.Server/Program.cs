using FinalAspReactAuction.Server.Controllers;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Repository;
using FinalAspReactAuction.Server.Services.Abstract;
using FinalAspReactAuction.Server.Services.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var conn = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlServer(conn);
});

builder.Services.AddDbContext<CustomIdentityDbContext>(options =>
{
    options.UseSqlServer(conn);
});

builder.Services.AddIdentity<CustomIdentityUser, CustomIdentityRole>()
    .AddEntityFrameworkStores<CustomIdentityDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); 
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<IMakeService, MakeService>();
builder.Services.AddScoped<IModelService, ModelService>();

builder.Services.AddCors(p => p.AddPolicy("cors", builder =>
{
    builder.WithOrigins("https://localhost:50007") 
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();   
app.UseAuthorization();    

app.MapControllers();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) 
    .AllowCredentials()); 

app.Run();
