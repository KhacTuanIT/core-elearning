CREATE TABLE [dbo].[Question]
(
	[Id] UNIQUEIDENTIFIER NOT NULL, 
    [QuestionText] NVARCHAR(MAX) NULL, 
    [Description] NVARCHAR(250) NULL,
    [CategoryId] UNIQUEIDENTIFIER,
    [IsHide] BIT NOT NULL DEFAULT 0,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME, 
    [CreatedBy] UNIQUEIDENTIFIER NULL, 
    [UpdatedAt] DATETIME NULL, 
    [UpdatedBy] UNIQUEIDENTIFIER NULL
    
    CONSTRAINT PK_Question PRIMARY KEY (Id)
    CONSTRAINT FK_CategoryQuestion FOREIGN KEY (CategoryId) REFERENCES Category(Id), 
)
