using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Services.Concrete
{
    public class MakeService : IMakeService
    {
        private readonly ApplicationDbContext _context;

        public MakeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Make> Add(Make entity)
        {
            await _context.Makes.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Make entity)
        {
            _ = Task.Run(async () =>
            {
                var make = await _context.Makes.FirstOrDefaultAsync(m => m.Id == entity.Id);
                if (make is { })
                {
                    _context.Makes.Remove(entity);
                    await _context.SaveChangesAsync();
                }
            });
        }

        public async Task DeleteById(int id)
        {
            var make = await _context.Makes.FirstOrDefaultAsync(a => a.Id == id);
            if (make != null)
            {
                _context.Makes.Remove(make);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("No element found with this Id.");
            }
        }


        public async Task<IEnumerable<Make>> Filter(Expression<Func<Make, decimal>> predicate)
        {
            return await _context.Makes.ToListAsync();
        }

        public async Task<IEnumerable<Make>> GetAll()
        {
            var makes = await _context.Makes.ToListAsync();
            return makes.Any() ? makes : new List<Make>();
        }

        public async Task<Make> GetById(int id)
        {
            var result = await _context.Makes.FirstOrDefaultAsync(a => a.Id == id);
            if (result is not null)
            {
                return result;
            }
            return null;
        }

        public async Task<Make> GetByObject(Make entity)
        {
            var entityReturn = await _context.Makes
                                    .FirstOrDefaultAsync(m => m.Id == entity.Id);

            if (entityReturn != null)
            {
                return entityReturn;
            }
            throw new Exception("Not Found");
        }

        public async Task Update(Make entity)
        {
            var element = await _context.Makes.FirstOrDefaultAsync(a => a.Id == entity.Id);

            if (element != null)
            {
                element.Name = entity.Name;
                element.Description = entity.Description;
                element.Models = entity.Models;
                element.Cars = entity.Cars;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while updating Make with ID {entity.Id}: {ex.Message}", ex);
                }
            }
            else
            {
                throw new Exception($"Make with ID {entity.Id} not found.");
            }
        }

    }
}
