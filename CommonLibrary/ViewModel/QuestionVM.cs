using CommonLibrary.EDbContext.DbContextExtensions;

namespace CommonLibrary.ViewModel
{
    public class QuestionVM : BaseEntity
    {
        public string? QuestionText { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
        public IEnumerable<AnswerVM>? Answers { get; set; } = null;
    }
}
