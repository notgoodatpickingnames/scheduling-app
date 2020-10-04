create procedure stores.usp_UpdateStore
	@storeId uniqueidentifier,
	@storeName nvarchar(50),
	@storeDescription nvarchar(50)
as
begin
	
	set nocount on;
	
	update	stores.Store
	set		[Name] = @storeName,
			[Description] = @storeDescription
	where	StoreId = @storeId;

end;