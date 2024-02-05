/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

IF (EXISTS(SELECT * FROM [dbo].[Category]))  
BEGIN  
    ALTER TABLE [dbo].[Category]
    ADD IsHide bit NOT NULL DEFAULT 0
END 

IF (EXISTS(SELECT * FROM [dbo].[Question]))  
BEGIN  
    ALTER TABLE [dbo].[Question]
    ADD IsHide bit NOT NULL DEFAULT 0
END 

IF (EXISTS(SELECT * FROM [dbo].[Answer]))  
BEGIN  
    ALTER TABLE [dbo].[Answer]
    ADD IsHide bit NOT NULL DEFAULT 0
END 