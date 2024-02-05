using System.Linq.Expressions;

namespace CommonLibrary.Uow.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> All(); // Task is a type that represents an asynchronous operation that can return a value
        Task<T> GetById(Guid id);

        Task<IEnumerable<T>> Get(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null);

        Task<bool> Add(T entity); // returns true if successful

        Task<bool> Delete(Guid id);

        bool Update(T entity);
    }
}
