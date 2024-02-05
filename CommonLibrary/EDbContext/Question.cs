using CommonLibrary.EDbContext.DbContextExtensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommonLibrary.EDbContext
{
    [Table("Question")]
    public class Question : BaseEntity
    {
        public string? QuestionText { get; set; }
        public string? Description { get; set; }
        public ICollection<Answer>? Answers { get; set; }

        public Guid CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
