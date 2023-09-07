CREATE OR REPLACE FUNCTION public.modify_discount(given_serviceid integer, given_pid integer, given_discount numeric)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	_already_in integer:=0;
	_pid integer:=0;
	_sid integer:=0;
	_t_row record:=null;
begin 
	select count(ps.pid) into _already_in 
	from public.providerservicetypes ps 
	where ps.pid = given_pid and ps.serviceid=given_serviceid;
	select count(p.pid) into _pid
	from public.providers p
	where p.pid = given_pid;
	select count(s.serviceid) into _sid
	from public.servicetypes s
	where s.serviceid = given_serviceid;
	if (_already_in = 1) and (_pid = 1) and (_sid = 1) and ( given_discount < 100) and ( given_discount > 0) then
		update public.providerservicetypes 
		set discountpercentage = given_discount
		where pid = given_pid and serviceid = given_serviceid;
		return true;
	end if;
	return false;
end;
$function$
;
