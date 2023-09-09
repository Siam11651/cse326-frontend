CREATE OR REPLACE FUNCTION public.get_provider_details2(given_pid integer)
 RETURNS providers
 LANGUAGE plpgsql
AS $function$
declare 
	t_provider record:=null;
begin 
	select
	*
	into t_provider
	from 
	public.providers p
	where
	p.pid = given_pid;
	return t_provider;
end;

$function$
;
