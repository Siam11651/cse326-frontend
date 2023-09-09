CREATE OR REPLACE FUNCTION public.insert_providers(given_pname character varying, given_mail character varying, given_security_key character varying, given_contactnumber character varying, given_contactaddress character varying, given_nidnumber character varying, given_nidcopy bytea, given_imagefile bytea, given_local character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	_pid integer:=null;
	_is_local_valid boolean:=false;
begin
	select * into _is_local_valid from is_local_area_in_table(given_local);
	if (_is_local_valid ) then
		insert into public.providers (
		pname,
		mail ,
		security_key ,
		contactnumber ,
		contactaddress ,
		nidnumber ,
		nidcopy ,
		imagefile ,
		local_area
		)
		values (
		given_pname ,
		given_mail ,
		given_security_key ,
		given_contactnumber ,
		given_contactaddress,
		given_nidnumber ,
		given_nidcopy ,
		given_imagefile,
		given_local
		) returning pid into _pid;
	end if;
	return _pid;
end;
$function$
;
