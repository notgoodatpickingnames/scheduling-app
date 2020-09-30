CREATE TABLE [stores].[Store]
(
	[StoreId] uniqueidentifier not null PRIMARY KEY DEFAULT newid(), 
    [Name] NVARCHAR(50) NOT NULL, 
    [Description] NVARCHAR(50) NULL
)
