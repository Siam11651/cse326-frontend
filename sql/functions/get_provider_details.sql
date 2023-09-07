CREATE OR REPLACE FUNCTION public.get_provider_details(given_pname character varying)
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
	p.pname = given_pname;
	return t_provider;
end;

$function$
;
