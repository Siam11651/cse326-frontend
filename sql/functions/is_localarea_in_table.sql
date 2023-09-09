CREATE OR REPLACE FUNCTION public.is_local_area_in_table(given_local_area character varying)
 RETURNS boolean
 LANGUAGE sql
AS $function$
select exists(select * from public.locales l where l.area_name = given_local_area );
$function$
;
