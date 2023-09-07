CREATE OR REPLACE FUNCTION public.add_a_consumer(given_cname character varying, given_mail character varying, given_security_key character varying, given_contactnumber character varying, given_billingaddress character varying, given_imagefile bytea)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	_new_cid integer:=null;
begin
	insert into
	public.consumers (
	cname,
	mail ,
	security_key ,
	contactnumber ,
	billingaddress ,
	imagefile 
	)
	values (
	given_cname,
	given_mail ,
	given_security_key ,
	given_contactnumber,
	given_billingaddress,
	given_imagefile 
	) returning consumerid into _new_cid;
	
	return _new_cid; 
end;
$function$
;
