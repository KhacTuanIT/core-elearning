using CommonLibrary.EDbContext.DbContextExtensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommonLibrary.EDbContext
{
    [Table("Answer")]
    public class Answer : BaseEntity
    {
        public string? ShortAnswer { get; set; }
        public string? AnswerText { get; set; }
        public int Level { get; set; }
        public Guid QuestionId { get; set; }
        public Question? Question { get; set; }
    }
}
