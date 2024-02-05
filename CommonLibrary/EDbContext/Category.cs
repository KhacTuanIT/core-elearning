using CommonLibrary.EDbContext.DbContextExtensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommonLibrary.EDbContext
{
    [Table("Category")]
    public class Category : BaseEntity
    {
        public string? CategoryName { get; set; }
        public ICollection<Question>? Questions { get; set; }
    }
}
