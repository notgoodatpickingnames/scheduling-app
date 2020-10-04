create procedure stores.usp_InsertStore
	@name nvarchar(50),
	@description nvarchar(50)
as
begin
	
	set nocount on;

	insert	into stores.Store(StoreId, [Name], [Description])
	select	newid(),
			@name,
			@description;

end;
