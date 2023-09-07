CREATE OR REPLACE FUNCTION public.get_matching_local_area_count(given_pid integer, given_consumerid integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	_matched_locals integer:= 0;
	_provider_local varchar:= '';
begin
	select p.local_area into _provider_local from public.providers p where p.pid = given_pid;
	select 
		count(ca.consumer_local_area)
	into _matched_locals
	from public.consumerdeliveryadresses ca 
	where ca.consumerid = given_consumerid and ca.consumer_local_area = _provider_local;
	
	return _matched_locals;
end;

$function$
;
