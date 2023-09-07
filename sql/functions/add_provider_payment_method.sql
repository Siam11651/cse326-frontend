CREATE OR REPLACE FUNCTION public.add_provider_paymentmethod(_pid integer, _method character varying)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	_already_in integer:=null;
begin
	select count(pp.pid) into _already_in from public.providerpaymentmethods pp where pp.pid = _pid and pp.paymentmethod = _method;
	if (_already_in = 0) then
		insert into public.providerpaymentmethods
		values(_pid, _method);
		return true;
	end if;
	return false;
end;

$function$
;
