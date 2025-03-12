using FinalAspReactAuction.Server.Entities;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetByObject(T entity);
        Task Delete(T entity);
        Task Update(T entity);
        Task<T> Add(T entity);
        Task<IEnumerable<T>> Filter(Expression<Func<T, decimal>> predicate);
    }
}
