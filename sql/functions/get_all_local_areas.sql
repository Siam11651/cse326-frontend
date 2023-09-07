CREATE OR REPLACE FUNCTION public.get_all_locales()
 RETURNS TABLE(area_name character varying)
 LANGUAGE sql
AS $function$
select * from public.locales;
$function$
;
