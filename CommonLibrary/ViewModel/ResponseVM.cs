using System.Net;

namespace CommonLibrary.ViewModel
{
    public class ResponseVM
    {
        public object? Data { get; set; }
        public bool Success { get; set; }
        public object? Error { get; set; }
        public HttpStatusCode ErrorCodeStatus { get; set; } = HttpStatusCode.OK;
    }
}
