using CommonLibrary.EDbContext;
using CommonLibrary.Services.Interfaces;
using CommonLibrary.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CoreELearning.Controllers
{
    [Route("[controller]")]
    public class AnswerController : BaseController
    {
        private readonly IAnswerService _answerService;

        public AnswerController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        [HttpGet]
        public async Task<ResponseVM> Get()
        {
            var answers = await _answerService.GetAnswers();

            return new ResponseVM()
            {
                Data = answers,
                Success = true
            };
        }

        [HttpGet]
        [Route("{answerId}")]
        public async Task<ActionResult<ResponseVM>> Get(Guid answerId)
        {
            var answer = await _answerService.GetAnswerById(answerId);

            if (answer == null)
            {
                return NotFound();
            }
            return new ResponseVM()
            {
                Data = answer,
                Success = true
            };
        }

        [HttpGet]
        [Route("by-question/{questionId}")]
        public async Task<ResponseVM> GetByQuestionId(Guid questionId)
        {
            var answers = await _answerService.GetAnswersByQuestionId(questionId);

            return new ResponseVM()
            {
                Data = answers,
                Success = true
            };
        }

        [HttpPost]
        public async Task<ActionResult<ResponseVM>> Add(AnswerVM answer)
        {
            var insertAnswer = new Answer
            {
                AnswerText = answer.AnswerText,
                ShortAnswer = answer.ShortAnswer,
                QuestionId = answer.QuestionId,
            };
            var result = await _answerService.AddAnswer(insertAnswer);
            return ResponseResult(result);
        }

        [HttpPatch("{answerId}")]
        public async Task<ActionResult<ResponseVM>> Update(Guid answerId, [FromBody] AnswerVM answer)
        {
            var updateAnswer = new Answer
            {
                Id = answerId,
                ShortAnswer = answer.ShortAnswer,
                AnswerText = answer.AnswerText,
                QuestionId = answer.QuestionId,
            };
            var result = await _answerService.UpdateAnswer(answerId, updateAnswer);
            return ResponseResult(result);
        }


        [HttpDelete("{answerId}")]
        public async Task<ActionResult<ResponseVM>> Delete(Guid answerId)
        {
            var result = await _answerService.DeleteAnswer(answerId);
            if (result.ErrorCodeStatus == HttpStatusCode.NotFound)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPost, Route("restore/{answerId}")]
        public async Task<ActionResult<ResponseVM>> Restore(Guid answerId)
        {
            var result = await _answerService.RestoreAnswer(answerId);
            return ResponseResult(result);
        }
    }
}
