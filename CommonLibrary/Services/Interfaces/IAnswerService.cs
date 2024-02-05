using CommonLibrary.EDbContext;
using CommonLibrary.ViewModel;

namespace CommonLibrary.Services.Interfaces
{
    public interface IAnswerService
    {
        Task<IEnumerable<Answer>> GetAnswers();
        Task<IEnumerable<Answer>> GetAnswersByQuestionId(Guid questionId);
        Task<Answer> GetAnswerById(Guid answerId);
        Task<ResponseVM> AddAnswer(Answer anwser);
        Task<ResponseVM> UpdateAnswer(Guid anwserId, Answer anwser);
        Task<ResponseVM> DeleteAnswer(Guid anwserId);
        Task<ResponseVM> RestoreAnswer(Guid answerId);
    }
}
