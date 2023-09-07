CREATE OR REPLACE FUNCTION public.get_consumer_details(given_cname character varying)
 RETURNS consumers
 LANGUAGE plpgsql
AS $function$
declare 
	t_consumer record:=null;
begin 
	select
	*
	into t_consumer
	from 
	public.consumers c
	where
	c.cname = given_cname;
	return t_consumer;
end;

$function$
;
