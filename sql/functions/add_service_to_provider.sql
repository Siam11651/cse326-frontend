CREATE OR REPLACE FUNCTION public.add_service_to_provider(given_serviceid integer, given_pid integer)
 RETURNS providerservicetypes
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
	if (_already_in = 0) and (_pid = 1) and (_sid = 1) then
		insert into public.providerservicetypes (pid, serviceid)
		values (given_pid, given_serviceid) returning * into _t_row;
	end if;
	return _t_row;
end;
$function$
;
