CREATE OR REPLACE FUNCTION public.get_all_payment_methods()
 RETURNS TABLE(methods character varying)
 LANGUAGE plpgsql
AS $function$
begin
	return query select * from public.paymentmethods;
end;

	
$function$
;
