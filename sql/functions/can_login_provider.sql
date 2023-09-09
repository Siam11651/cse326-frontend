CREATE OR REPLACE FUNCTION public.can_log_in_provider(_providername character varying, _key character varying)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	_count integer:=null;
begin
	select count(p.pid) into _count from public.providers p where p.pname = _providername and p.security_key = _key;
	if _count = 1 then
		return true;
	else
		return false;
	end if;
end;
$function$
;
