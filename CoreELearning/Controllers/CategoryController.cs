using CommonLibrary.EDbContext;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CoreELearning.Controllers
{
    [Route("[controller]")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ResponseVM> Get()
        {
            var categories = await _categoryService.GetCategories();
            return new ResponseVM()
            {
                Data = categories,
                Success = true,
            };
        }

        [HttpGet]
        [Route("{categoryId}")]
        public async Task<ActionResult<ResponseVM>> Get(Guid categoryId)
        {
            var category = await _categoryService.GetCategoryById(categoryId);
            if (category == null)
            {
                return NotFound();
            }
            return new ResponseVM()
            {
                Data = category,
                Success = true,
            };
        }

        [HttpPost]
        public async Task<ActionResult<ResponseVM>> Add(CategoryVM category)
        {
            var insertCategory = new Category
            {
                CategoryName = category.CategoryName,
            };

            var result = await _categoryService.AddCategory(insertCategory);
            return ResponseResult(result);
        }

        [HttpPatch("{categoryId}")]
        public async Task<ActionResult<ResponseVM>> Update(Guid categoryId, [FromBody] CategoryVM category)
        {
            var updateCategory = new Category
            {
                Id = categoryId,
                CategoryName = category.CategoryName,
            };
            var result = await _categoryService.UpdateCategory(categoryId, updateCategory);
            return ResponseResult(result);
        }

        [HttpDelete("{categoryId}")]
        public async Task<ActionResult<ResponseVM>> Delete(Guid categoryId)
        {
            var result = await _categoryService.DeleteCategory(categoryId);
            return ResponseResult(result);
        }

        [HttpPost, Route("restore/{categoryId}")]
        public async Task<ActionResult<ResponseVM>> Restore(Guid categoryId)
        {
            var result = await _categoryService.RestoreCategory(categoryId);
            return ResponseResult(result);
        }
    }
}
