using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("Cars")]
        public async Task<IEnumerable<Car>> GetCars()
        {
           return await _carService.GetAllCars();
        }

        [HttpGet("GetByCarObject")]
        public async Task<Car> GetCarById(Car car)
        {
            return await _carService.GetCarByCar(car);
        }

        [HttpGet("GetById")]
        public async Task<Car> GetById(int id)
        {
           return await _carService.GetById(id);
        }

        [HttpDelete("DeleteById")]
        public async Task Delete(int id)
        {
            var foundId = await _carService.GetById(id);
            await _carService.Delete(foundId);
        }

        [HttpGet("OrderBy")]
        public async Task<IEnumerable<Car>> SortByPriceDescending() {
            return await _carService.Filter(a => a.Price);
        }

        [HttpGet("GetByBrandName")]
        public async Task<ICollection<Car>> GetByBrandName(int id)
        {
            var makes  = await _carService.GetByMake(id);
            return makes;
        }
    }
}
