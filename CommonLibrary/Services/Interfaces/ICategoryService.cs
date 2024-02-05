using CommonLibrary.EDbContext;
using CommonLibrary.ViewModel;

namespace CommonLibrary.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(Guid categoryId);
        Task<ResponseVM> AddCategory(Category category);
        Task<ResponseVM> UpdateCategory(Guid categoryId, Category category);
        Task<ResponseVM> DeleteCategory(Guid categoryId);
        Task<ResponseVM> RestoreCategory(Guid categoryId);
    }
}
