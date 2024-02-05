using CommonLibrary.EDbContext;
using CommonLibrary.Uow.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;

namespace CommonLibrary.Uow
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected CoreELearningDbContext _context;
        protected DbSet<T> _dbSet;
        protected readonly ILogger _logger;

        // constructor will take the context and logger factory as parameters
        public Repository(
            DbContext context,
            ILogger logger
        )
        {
            _context = (CoreELearningDbContext)context;
            _logger = logger;
            _dbSet = _context.Set<T>();
        }

        public virtual async Task<IEnumerable<T>> All() // virtual means that this method can be overriden by a class that inherits from this class
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T> GetById(Guid id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting entity with id {Id}", id);
                return null;
            }
        }

        public virtual async Task<bool> Add(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error adding entity");
                return false;
            }
        }

        public virtual async Task<bool> Delete(Guid id)
        {
            try
            {
                var entity = await _dbSet.FindAsync(id);
                if (entity != null)
                {
                    _dbSet.Remove(entity);
                    return true;
                }
                else
                {
                    _logger.LogWarning("Entity with id {Id} not found for deletion", id);
                    return false;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error deleting entity with id {Id}", id);
                return false;
            }
        }


        public virtual bool Update(T entityToUpdate)
        {
            try
            {
                _dbSet.Attach(entityToUpdate);
                _context.Entry(entityToUpdate).State = EntityState.Modified;
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error update entity");
                return false;
            }
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null)
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }
    }
}
