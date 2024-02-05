using CommonLibrary.EDbContext;
using CommonLibrary.Services;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CoreELearning.Controllers
{
    [Route("[controller]")]
    public class QuestionController : BaseController
    {
        private readonly IQuestionService _questionService;
        public QuestionController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseVM>> Get()
        {
            var questions = await _questionService.GetQuestions();
            return new ResponseVM()
            {
                Data = questions,
                Success = true
            };
        }

        [HttpGet]
        [Route("{questionId}")]
        public async Task<ActionResult<ResponseVM>> Get(Guid questionId)
        {
            var question = await _questionService.GetQuestionById(questionId);
            if (question == null)
            {
                return NotFound();
            }
            return new ResponseVM()
            {
                Data = question,
                Success = true
            };
        }

        [HttpGet]
        [Route("by-category/{categoryId}")]
        public async Task<ActionResult<ResponseVM>> GetByCategoryId(Guid categoryId)
        {
            var questions = await _questionService.GetQuestionsByCategoryId(categoryId);
            return new ResponseVM() 
            { 
                Data = questions, 
                Success = true 
            };
        }

        [HttpPost]
        public async Task<ActionResult<ResponseVM>> Add(QuestionVM question)
        {
            var insertQuestion = new Question
            {
                QuestionText = question.QuestionText,
                CategoryId = question.CategoryId,
                Description = question.Description
            };
            var result = await _questionService.AddQuestion(insertQuestion);
            return ResponseResult(result);
        }

        [HttpPatch("{questionId}")]
        public async Task<ActionResult<ResponseVM>> Update(Guid questionId, [FromBody] QuestionVM question)
        {
            var updateQuestion = new Question
            {
                Id = questionId,
                QuestionText = question.QuestionText,
                Description = question.Description,
            };
            var result = await _questionService.UpdateQuestion(questionId, updateQuestion);
            return ResponseResult(result);
        }

        [HttpDelete("{questionId}")]
        public async Task<ActionResult<ResponseVM>> Delete(Guid questionId)
        {
            var result = await _questionService.DeleteQuestion(questionId);
            return ResponseResult(result);
        }

        [HttpPost, Route("restore/{questionId}")]
        public async Task<ActionResult<ResponseVM>> Restore(Guid questionId)
        {
            var result = await _questionService.RestoreQuestion(questionId);
            return ResponseResult(result);
        }
    }
}
