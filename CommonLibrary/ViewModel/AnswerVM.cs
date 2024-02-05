using CommonLibrary.EDbContext.DbContextExtensions;

namespace CommonLibrary.ViewModel
{
    public class AnswerVM : BaseEntity
    {
        public string? ShortAnswer { get; set; }
        public string? AnswerText { get; set; }
        public int Level { get; set; }
        public Guid QuestionId { get; set; }
    }
}
