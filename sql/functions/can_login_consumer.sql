CREATE OR REPLACE FUNCTION public.can_log_in_consumer(_consumername character varying, _key character varying)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	_count integer:=null;
begin
	select count(c.consumerid) into _count from public.consumers c where c.cname = _consumername and c.security_key = _key;
	if _count = 1 then
		return true;
	else
		return false;
	end if;
end;
$function$
;
