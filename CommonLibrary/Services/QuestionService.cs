using CommonLibrary.Constants;
using CommonLibrary.EDbContext;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.Uow.Interfaces;
using CommonLibrary.ViewModel;
using System.Net;

namespace CommonLibrary.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseVM> AddQuestion(Question question)
        {
            var result = await _unitOfWork.Repository<Question>().Add(question);
            var response = new ResponseVM()
            {
                Success = result
            };
            if (result == true)
            {
                _unitOfWork.Commit();
                response.Data = question;
            }
            else
            {
                _unitOfWork.Rollback();
            }
            return response;
        }

        public async Task<ResponseVM> DeleteQuestion(Guid questionId)
        {
            var question = await GetQuestionById(questionId);
            if (question == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(question), questionId)
                };
            }

            question.Delete(Guid.Empty);
            _unitOfWork.Commit();
            return new ResponseVM()
            {
                Success = true
            };
        }

        public async Task<Question> GetQuestionById(Guid questionId)
        {
            return await _unitOfWork.Repository<Question>().GetById(questionId);
        }

        public async Task<IEnumerable<Question>> GetQuestions()
        {
            return await _unitOfWork.Repository<Question>().All();
        }

        public async Task<IEnumerable<Question>> GetQuestionsByCategoryId(Guid categoryId)
        {
            var questions = await _unitOfWork.Repository<Question>().Get(x => x.CategoryId == categoryId);
            return questions;
        }

        public async Task<ResponseVM> RestoreQuestion(Guid questionId)
        {
            var entity = await _unitOfWork.Repository<Question>().GetById(questionId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(entity), questionId),
                    ErrorCodeStatus = HttpStatusCode.NotFound,
                };
            }

            entity.IsDeleted = false;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Question>().Update(entity);
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

        public async Task<ResponseVM> UpdateQuestion(Guid questionId, Question question)
        {
            var entity = await _unitOfWork.Repository<Question>().GetById(questionId);
            if (entity == null)
            {
                return new ResponseVM()
                {
                    Success = false,
                    Error = string.Format(ResponseConstants.NotFoundEntity, nameof(entity), questionId)
                };
            }

            entity.QuestionText = question.QuestionText;
            entity.Description = question.Description;
            entity.LastUpdate(Guid.Empty);

            var result = _unitOfWork.Repository<Question>().Update(entity);
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
