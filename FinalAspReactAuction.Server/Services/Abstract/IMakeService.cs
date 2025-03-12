using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Repository;

namespace FinalAspReactAuction.Server.Services.Abstract
{
    public interface IMakeService : IRepository<Make>
    {
        Task<Make> GetById(int id);
        Task DeleteById(int id);
    }
}
