namespace CommonLibrary.EDbContext.DbContextExtensions
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            CreatedBy = Guid.Empty;
            UpdatedBy = Guid.Empty;
        }

        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid UpdatedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsHide { get; set; }

        public void LastUpdate(Guid userId)
        {
            UpdatedAt = DateTime.Now;
            UpdatedBy = userId;
        }

        public void Delete(Guid userId)
        {
            IsDeleted = true;
            LastUpdate(userId);
        }
    }
}
