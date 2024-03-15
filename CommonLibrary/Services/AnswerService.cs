using CommonLibrary.Constants;
using CommonLibrary.EDbContext;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.Uow.Interfaces;
using CommonLibrary.ViewModel;
using System.Net;

namespace CommonLibrary.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public AnswerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseVM> AddAnswer(Answer answer)
        {
            var result = await _unitOfWork.Repository<Answer>().Add(answer);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = answer;
            }
            else
            {
                _unitOfWork.Rollback();
            }
            return response;
        }

        public async Task<ResponseVM> DeleteAnswer(Guid answerId)
        {
            var answer = await GetAnswerById(answerId);
            if (answer == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(answer), answerId)
                };
            }

            answer.Delete(Guid.Empty);
            _unitOfWork.Commit();
            return new ResponseVM()
            {
                Success = false
            }; ;
        }

        public async Task<Answer> GetAnswerById(Guid answerId)
        {
            var answer = await _unitOfWork.Repository<Answer>().GetById(answerId);
            return answer;
        }

        public async Task<IEnumerable<Answer>> GetAnswers()
        {
            var answers = await _unitOfWork.Repository<Answer>().All();
            return answers;
        }

        public async Task<IEnumerable<Answer>> GetAnswersByQuestionId(Guid questionId)
        {
            var answers = await _unitOfWork.Repository<Answer>().Get(x => x.QuestionId == questionId);
            return answers;
        }

        public async Task<ResponseVM> RestoreAnswer(Guid answerId)
        {
            var entity = await _unitOfWork.Repository<Answer>().GetById(answerId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(entity), answerId),
                    ErrorCodeStatus = HttpStatusCode.NotFound,
                };
            }

            entity.IsDeleted = false;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Answer>().Update(entity);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = entity;
            }
            else
            {
                _unitOfWork.Rollback();
                response.ErrorCodeStatus = HttpStatusCode.BadRequest;
            }
            return response;
        }

        public async Task<ResponseVM> UpdateAnswer(Guid answerId, Answer answer)
        {
            var entity = await _unitOfWork.Repository<Answer>().GetById(answerId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(entity), answerId)
                };
            }

            entity.AnswerText = answer.AnswerText;
            entity.ShortAnswer = answer.ShortAnswer;
            entity.QuestionId = answer.QuestionId;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Answer>().Update(entity);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = entity;
            }
            else
            {
                _unitOfWork.Rollback();
            }
            return response;
        }
    }
}
