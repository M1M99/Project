using FinalAspReactAuction.Server.Dtos.ModelDto;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IModelService _modelService;

        public ModelController(IModelService modelService)
        {
            _modelService = modelService;
        }

        [HttpGet("GetAllModel")]
        public async Task<ActionResult> GetAllModel()
        {
            var listOfModel = await _modelService.GetAll();
            return Ok(listOfModel);
        }

        [HttpDelete("DeleteModelById")]
        public async Task<ActionResult> DeleteById(int id)
        {
            await _modelService.DeleteById(id);
            return NoContent();
        }

        [HttpPost("AddModel")]
        public async Task<ActionResult<AddModelDto>> AddModel([FromBody] AddModelDto dto) {
            var newModel = new Model
            {
                Make = dto.Make,
                Name = dto.Name,
                Type = dto.Type
            };
            await _modelService.Add(newModel);
            var dtoModel = new AddModelDto
            {
                Make = newModel.Make,
                Type = newModel.Name,
                Name = newModel.Type
            };
            return Ok(dtoModel);
        }
    }
}
