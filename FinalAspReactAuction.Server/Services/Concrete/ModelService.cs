using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Services.Concrete
{
    public class ModelService : IModelService
    {
        private readonly ApplicationDbContext _context;

        public ModelService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Entities.Model> Add(Entities.Model entity)
        {
            await _context.Models.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Entities.Model entity)
        {
            var element = await _context.Models.FirstOrDefaultAsync(a => a.Id == entity.Id);
            _context.Models.Remove(element);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var model = await _context.Models.FindAsync(id);
            if(model == null) {
                throw new Exception();
            }
            _context.Models.Remove(model);
            await _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Entities.Model>> Filter(Expression<Func<Entities.Model, decimal>> predicate)
        {
            throw new NotImplementedException();
        }

        //public async Task<IEnumerable<Entities.Model>> GetAll()
        //{
        //    if(_context.Models.Any()){
        //        return await _context.Models.Include(a => a.Make).ToListAsync();    
        //    }
        //    return [];
        //}

        public async Task<IEnumerable<Entities.Model>> GetAll()
        {
            if (_context.Models.Any())
            {
                return await _context.Models
                                     .Include(m => m.Make)
                                     .Select(m => new Entities.Model
                                     {
                                         Id = m.Id,
                                         Name = m.Name,
                                         Type = m.Type,
                                         Make = new Make
                                         {
                                             Name = m.Make.Name
                                         },
                                         Cars = m.Cars
                                     })
                                     .ToListAsync();
            }
            return new List<Entities.Model>();
        }


        public Task<Entities.Model> GetByObject(Entities.Model entity)
        {
            throw new NotImplementedException();
        }

        public Task Update(Entities.Model entity)
        {
            throw new NotImplementedException();
        }
    }
}
