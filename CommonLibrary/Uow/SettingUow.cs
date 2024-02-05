using CommonLibrary.Uow.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CommonLibrary.Uow
{
    public static class SettingUow
    {
        public static void AddUowService(this IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            var logger = serviceProvider.GetService<ILogger<UnitOfWork>>();
            services.AddSingleton(typeof(ILogger), logger);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
