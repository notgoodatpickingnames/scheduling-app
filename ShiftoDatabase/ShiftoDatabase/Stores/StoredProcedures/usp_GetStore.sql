create procedure stores.usp_GetStore
	@storeId uniqueidentifier
as
begin
	
	set nocount on;

	Select	StoreId,
			[Name],
			[Description]
	from	stores.Store
	where	StoreId = @storeId;

end;
