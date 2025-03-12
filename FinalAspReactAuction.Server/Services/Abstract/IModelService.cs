using FinalAspReactAuction.Server.Entities;
using FinalAspReactAuction.Server.Repository;

namespace FinalAspReactAuction.Server.Services.Abstract
{
    public interface IModelService : IRepository<Model>
    {
        Task DeleteById(int id);
    }
}
