using CommonLibrary.EDbContext;
using CommonLibrary.ViewModel;

namespace CommonLibrary.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetQuestions();
        Task<IEnumerable<Question>> GetQuestionsByCategoryId(Guid categoryId);
        Task<Question> GetQuestionById(Guid questionId);
        Task<ResponseVM> AddQuestion(Question question);
        Task<ResponseVM> UpdateQuestion(Guid questionId, Question question);
        Task<ResponseVM> DeleteQuestion(Guid questionId);
        Task<ResponseVM> RestoreQuestion(Guid questionId);
    }
}
