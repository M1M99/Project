using FinalAspReactAuction.Server.Entities;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllCars();
        Task<T> GetCarByCar(T entity);
        Task Delete(T entity);
        Task Update(T entity);
        Task<IEnumerable<T>> Filter(Expression<Func<T, decimal>> predicate);
    }
}
