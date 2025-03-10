using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Repository;
using FinalAspReactAuction.Server.Services.Concrete;

namespace FinalAspReactAuction.Server.Services.Abstract
{
    public interface ICarService:IRepository<Car>
    {
        Task<Car> GetById(int id);
        Task<ICollection<Car>> GetByMake(int id);
    }
}
