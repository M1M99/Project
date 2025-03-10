using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Repository;
using FinalAspReactAuction.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Services.Concrete
{
    public class CarService : ICarService
    {
        private readonly ApplicationDbContext _context;

        public CarService(ApplicationDbContext context)
        {
            _context = context;
        }
        #region DeleteOnTask
        //public async Task Delete(Car entity)
        //{
        //    _ = Task.Run(() =>
        //    {
        //        var car = _context.Cars.FirstOrDefault(car => car.Id == entity.Id);
        //        if (car is not null)
        //        {
        //            _context.Cars.Remove(car);
        //            _context.SaveChangesAsync();
        //        }
        //    });
        //}
        #endregion

        public async Task Delete(Car entity)
        {
            var car = await _context.Cars.FirstOrDefaultAsync(car => car.Id == entity.Id);
            if (car is not null)
            {
                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Car>> Filter(Expression<Func<Car, decimal>> predicate)
        {
            return await _context.Cars.OrderByDescending(predicate).ToListAsync();
        }

 
        public async Task<IEnumerable<Car>> GetAllCars()
        {
            return await _context.Cars
                .Include(c => c.Make)
                .Include(c => c.Model)
                .ToListAsync();
        }

       

        public async Task<Car> GetById(int id)
        {
            return await _context.Cars.FirstOrDefaultAsync(car => car.Id == id);
        }

        public async Task<ICollection<Car>> GetByMake(int id)
        {
            var make = await _context.Makes.FirstOrDefaultAsync(m => m.Id == id);
            var query = await _context.Cars.Where(a => a.Make.Id == make.Id).ToListAsync();
            return query;
        }

        public Task<Car> GetCarByCar(Car entity)
        {
            var carForId = _context.Cars.FirstOrDefaultAsync(car => car.Id == entity.Id);
            if(carForId is not null)
            {
                return carForId;
            }
            return null;
        }

        public Task Update(Car entity)
        {
            throw new NotImplementedException();
        }
    }
}
