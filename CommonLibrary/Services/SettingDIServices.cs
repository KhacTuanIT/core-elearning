using CommonLibrary.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CommonLibrary.Services
{
    public static class SettingDIServices
    {
        public static void AddSettingService(this IServiceCollection services)
        {
            services.AddScoped<IAnswerService, AnswerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IQuestionService, QuestionService>();
        }
    }
}
