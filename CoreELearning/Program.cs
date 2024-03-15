using CommonLibrary.EDbContext;
using CommonLibrary.Services;
using CommonLibrary.Uow;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("CoreELearingDatabase");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
//   .AddNegotiate();

//builder.Services.AddAuthorization(options =>
//{
//    // By default, all incoming requests will be authorized according to the default policy.
//    options.FallbackPolicy = options.DefaultPolicy;
//});
builder.Services.AddDbContext<CoreELearningDbContext>(
    options => options.UseSqlServer(connectionString ?? "Default"));
builder.Services.AddScoped<DbContext, CoreELearningDbContext>();
builder.Services.AddSettingService();
builder.Services.AddUowService();

// config CORS
var clientAllowOrigins = "_clientAllowOrigin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: clientAllowOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(clientAllowOrigins);
app.MapControllers();

app.Run();
