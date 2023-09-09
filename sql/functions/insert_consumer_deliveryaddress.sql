CREATE OR REPLACE FUNCTION public.insert_consumer_delivery_address2(given_consumerid integer, given_delivery_address character varying, given_local_area character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	is_consumerid_valid integer := 0;
	is_local_valid integer := 0;
	is_present integer:=0;
begin
	select count(c.consumerid) into is_consumerid_valid
	from public.consumers c
	where c.consumerid = given_consumerid;
	select count(l.area_name) into is_local_valid
	from public.locales l
	where l.area_name = given_local_area;
	select count(ca.consumerid) into is_present
	from public.consumerdeliveryadresses ca
	where ca.consumerid = given_consumerid and ca.deliveryaddress = given_delivery_address;
	if (is_consumerid_valid = 1) then
		if (is_local_valid = 1) then 
			if (is_present = 0) then
				insert into public.consumerdeliveryadresses
				values (given_consumerid, given_delivery_address, given_local_area );
	
				return 0;
			else
				return 1;
			end if;
		else
			return 2;
		end if;
	else
		return 3;
	end if;
end;
$function$
;
