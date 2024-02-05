using CommonLibrary.Constants;
using CommonLibrary.EDbContext;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.Uow.Interfaces;
using CommonLibrary.ViewModel;
using System.Net;

namespace CommonLibrary.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseVM> AddCategory(Category category)
        {
            var result = await _unitOfWork.Repository<Category>().Add(category);
            var response = new ResponseVM();
            response.Success = result;
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = category;
            }
            else
            {
                _unitOfWork.Rollback();
                response.Data = HttpStatusCode.BadRequest;
            }
            return response;
        }

        public async Task<ResponseVM> DeleteCategory(Guid categoryId)
        {
            var category = await _unitOfWork.Repository<Category>().GetById(categoryId);
            if (category == null)
            {
                return new ResponseVM()
                {
                    ErrorCodeStatus = HttpStatusCode.NotFound,
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(category), categoryId)
                };
            }

            category.Delete(Guid.Empty);
            _unitOfWork.Commit();
            return new ResponseVM()
            {
                Success = true,
                Data = category
            };
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _unitOfWork.Repository<Category>().All();
            return categories;
        }

        public async Task<Category> GetCategoryById(Guid categoryId)
        {
            var category = await _unitOfWork.Repository<Category>().GetById(categoryId);
            return category;
        }

        public async Task<ResponseVM> RestoreCategory(Guid categoryId)
        {
            var entity = await _unitOfWork.Repository<Category>().GetById(categoryId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(entity), categoryId),
                    ErrorCodeStatus = HttpStatusCode.NotFound,
                };
            }

            entity.IsDeleted = false;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Category>().Update(entity);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = entity;
            }
            else
            {
                _unitOfWork.Rollback();
                response.ErrorCodeStatus = HttpStatusCode.BadRequest;
            }
            return response;
        }

        public async Task<ResponseVM> UpdateCategory(Guid categoryId, Category category)
        {
            var entity = await _unitOfWork.Repository<Category>().GetById(categoryId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(category), categoryId),
                    ErrorCodeStatus = HttpStatusCode.NotFound,
                };
            }

            entity.CategoryName = category.CategoryName;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Category>().Update(entity);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = entity;
            }
            else
            {
                _unitOfWork.Rollback();
                response.ErrorCodeStatus = HttpStatusCode.BadRequest;
            }
            return response;
        }
    }
}
