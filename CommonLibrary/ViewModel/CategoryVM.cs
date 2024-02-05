using CommonLibrary.EDbContext.DbContextExtensions;

namespace CommonLibrary.ViewModel
{
    public class CategoryVM : BaseEntity
    {
        public string? CategoryName { get; set; }
        public IEnumerable<QuestionVM>? Questions { get; set; } = null;
    }
}
