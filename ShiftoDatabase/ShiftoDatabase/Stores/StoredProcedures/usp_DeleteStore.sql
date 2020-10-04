create procedure stores.usp_DeleteStore
	@storeId uniqueidentifier
as
begin
	
	set nocount on;

	delete	from stores.Store
	where	StoreId = @storeId;

end;
