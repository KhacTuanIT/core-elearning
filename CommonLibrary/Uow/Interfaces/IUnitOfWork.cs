namespace CommonLibrary.Uow.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        void Rollback();
        IRepository<T> Repository<T>() where T : class;
    }
}
