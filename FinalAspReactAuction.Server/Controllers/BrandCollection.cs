using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandCollection : ControllerBase
    {
        private readonly ApplicationDbContext? _dbContext;

        public BrandCollection(ApplicationDbContext? dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetAll")]
        public async Task<ICollection<Make>> GetAllAsync()
        {
            return await _dbContext.Makes.ToListAsync();
        }
        [HttpGet("GetByName")]
        public async Task<Make> GetByName(string name)
        {
            return await _dbContext.Makes.FirstOrDefaultAsync(a => a.Name == name);
        }


        [HttpGet]
        public async Task<ActionResult> Get(int id)
        {
            var brand = await _dbContext.Makes.FirstOrDefaultAsync(a => a.Id == id);
            if (brand is { })
            {
                return Ok(brand);
            }
            return NotFound();
        }

        [HttpDelete("DeleteBrand")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var t = _dbContext.Makes.Remove(await _dbContext.Makes.FirstOrDefaultAsync(a => a.Id == id));
                await _dbContext.SaveChangesAsync();
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(505, "Can not delete Because This Make Using");
            }
        }
    }
}
