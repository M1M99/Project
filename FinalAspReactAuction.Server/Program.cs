using Auction.Business.Abstract;
using Auction.Business.Concrete;
using Auction.DataAccess.Abstract;
using Auction.DataAccess.Concrete.EntityFramework;
using CloudinaryDotNet;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using FinalAspReactAuction.Server.SignalR;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://localhost:50007") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var conn = builder.Configuration.GetConnectionString("DefaultConnection");
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 50 * 1024 * 1024);
builder.Services.Configure<IISServerOptions>(options =>
{
    options.MaxRequestBodySize = 104857600;
});
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

builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
builder.Services.AddScoped<ICarDal, EfCarDal>();
builder.Services.AddScoped<IMakeDal, EfMakeDal>();
builder.Services.AddScoped<IModelDal, EfModelDal>();
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<IModelService, ModelService>();
builder.Services.AddScoped<IMakeService, MakeService>();
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        builder => builder
//            .AllowAnyOrigin()
//            .AllowAnyMethod()
//            .AllowAnyHeader());
//});
//builder.Services.AddSignalR();
//builder.Services.AddCors(p => p.AddPolicy("cors", builder =>
//{
//    builder.WithOrigins("https://localhost:50007") 
//        .AllowAnyMethod()
//        .AllowAnyHeader()
//                        .AllowCredentials());
//}));

// SignalR servisini ekleyin
builder.Services.AddSignalR();
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

app.UseCors("AllowSpecificOrigin");
app.MapControllers();
app.MapHub<AuctionHub>("/auctionHub");
//app.UseCors(x => x
//    .AllowAnyMethod()
//    .AllowAnyHeader()
//    .SetIsOriginAllowed(origin => true)
//    .AllowCredentials());

app.Run();
