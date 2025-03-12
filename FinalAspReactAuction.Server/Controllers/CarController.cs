using FinalAspReactAuction.Server.Dtos.CarDto;
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
           return await _carService.GetAll();
        }

        [HttpGet("GetByCarObject")]
        public async Task<Car> GetCarById(Car car)
        {
            return await _carService.GetByObject(car);
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

        [HttpPost("AddNewCar")]
        public async Task<ActionResult<AddCarDto>> AddNewCar([FromBody]Car car) {
            var newCar = new Car
            {
                Branch = car.Branch,
                Country = car.Country,
                Cylinder = car.Cylinder,
                Damage = car.Damage,
                Description = car.Description,
                Engine = car.Engine,
                FuelType = car.FuelType,
                Key = car.Key,
                Make = car.Make,
                Model = car.Model,
                Otometer = car.Otometer,
                Price = car.Price,
                SaleDocument = car.SaleDocument,
                Vin = car.Vin,
                Year = car.Year
            };

            await _carService.Add(newCar);

            var dtoAdd = new AddCarDto
            {
                Branch = newCar.Branch,
                Country = newCar.Country,
                Cylinder = newCar.Cylinder,
                Damage = newCar.Damage,
                Description = newCar.Description,
                Engine = newCar.Engine,
                FuelType = newCar.FuelType,
                Key = newCar.Key,
                Make = newCar.Make,
                Model = newCar.Model,
                Otometer = newCar.Otometer,
                Price = newCar.Price,
                SaleDocument = newCar.SaleDocument,
                Vin = newCar.Vin,
                Year = newCar.Year
            };
            return Ok(dtoAdd);
        }
    }
}
