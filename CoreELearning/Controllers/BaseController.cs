using CommonLibrary.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CoreELearning.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class BaseController : ControllerBase
    {
        protected ActionResult<ResponseVM> ResponseResult(ResponseVM response)
        {
            ActionResult<ResponseVM> actionResutl = response.ErrorCodeStatus switch
            {
                HttpStatusCode.NoContent => NoContent(),
                HttpStatusCode.NotFound => NotFound(),
                HttpStatusCode.BadRequest => BadRequest(),
                _ => response,
            };
            return actionResutl;
        }
    }
}