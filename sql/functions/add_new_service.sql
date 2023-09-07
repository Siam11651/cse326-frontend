CREATE OR REPLACE FUNCTION public.add_new_service(given_pserviceid integer, given_title character varying, given_description character varying, _basecost numeric, avgruntime integer, _avgpersonnel integer, directnegotiating boolean)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	_sid integer:=null;
	_psid integer:=null;
begin
	select count(ps.pserviceid) into _psid from public.primaryservicetypes ps where ps.pserviceid = given_pserviceid;
	
	if (_psid = 1) and (given_title is not null) and (given_description is not null) then 
		insert into public.servicetypes
		(pserviceid, description, basecost, averagepersonnel, title, averageruntime, directnegotiate)
		values
		(given_pserviceid, given_description, _basecost, _avgpersonnel, given_title, avgruntime, directnegotiating)
		returning serviceid into _sid;
	end if;
	return _sid;
end;
$function$
;
