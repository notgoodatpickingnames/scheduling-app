create procedure stores.usp_ListStores
as
begin
	
	set nocount on;

	select	StoreId,
			[Name],
			[Description]
	from	stores.Store;

end;