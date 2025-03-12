using FinalAspReactAuction.Server.Dtos.CarDto;
using FinalAspReactAuction.Server.Dtos.MakeDto;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMakeService? _service;

        public BrandController(IMakeService? service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<Make>> GetAllAsync()
        {
            var result = await _service.GetAll();
            return result;
        }

        [HttpGet("GetById")]
        public async Task<Make> Get(int id)
        {
            return await _service.GetById(id);
        }

        [HttpDelete("DeleteBrand")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteById(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(505);
            }
        }

        [HttpPost("AddMake")]
        public async Task<ActionResult<AddMakeDto>> AddMake(Make make) {
            var brand = new Make
            {
                Description = make.Description,
                Name = make.Name
            };
            var brandd = await _service.Add(brand);

            var returnByDto = new AddMakeDto
            {
                Name = brand.Name,
                Description = brand.Description
            };
            return Ok(returnByDto);
        }
    }
}
