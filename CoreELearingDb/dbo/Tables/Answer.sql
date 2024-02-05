CREATE TABLE [dbo].[Answer]
(
	[Id] UNIQUEIDENTIFIER NOT NULL, 
    [ShortAnswer] NVARCHAR(MAX) NULL, 
    [AnswerText] NVARCHAR(MAX) NULL, 
    [Level] INT NULL, 
    [QuestionId] UNIQUEIDENTIFIER NULL,
    [IsHide] BIT NOT NULL DEFAULT 0,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME, 
    [CreatedBy] UNIQUEIDENTIFIER NULL, 
    [UpdatedAt] DATETIME NULL, 
    [UpdatedBy] UNIQUEIDENTIFIER NULL
    
    CONSTRAINT PK_Answer PRIMARY KEY (Id)
    CONSTRAINT FK_QuestionAnswer FOREIGN KEY (QuestionId) REFERENCES Question(Id),
)
