using Microsoft.EntityFrameworkCore;

namespace CommonLibrary.EDbContext
{
    public class CoreELearningDbContext : DbContext
    {
        public CoreELearningDbContext(DbContextOptions<CoreELearningDbContext> options) : base(options)
        {

        }

        public DbSet<Answer>? Answers { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Question>? Questions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>()
                .HasMany(s => s.Questions)
                .WithOne(d => d.Category)
                .HasForeignKey(s => s.CategoryId)
                .HasPrincipalKey(d => d.Id);

            modelBuilder.Entity<Question>()
                .HasMany(s => s.Answers)
                .WithOne(d => d.Question)
                .HasForeignKey(s => s.QuestionId)
                .HasPrincipalKey(d => d.Id);
        }
    }
}
