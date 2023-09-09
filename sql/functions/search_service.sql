CREATE OR REPLACE FUNCTION public.search_service(term character varying)
 RETURNS TABLE(pserviceid integer, s_serviceid integer, s_title character varying, s_description text, s_basecost numeric, s_averagepersonnel integer, s_averageruntime integer, s_searchrank real)
 LANGUAGE plpgsql
AS $function$  
begin
	return query SELECT
		servicetypes.pserviceid,
		servicetypes.serviceid, 
		servicetypes.title, 
		servicetypes.description,
		servicetypes.basecost, 
		servicetypes.averagepersonnel,
		servicetypes.averageruntime,
		ts_rank( '{1.0,0.2,0.0,0.0}', textsearchable_index_col || textsearchable_index_description , query) as rank
	FROM
		servicetypes, to_tsquery('english', coalesce(term, '')) query
	WHERE
		query @@ (textsearchable_index_col || textsearchable_index_description )
		OR
		(coalesce(term, '')) <% (title || ' ' || description)
		OR
		difference( (coalesce(term, '')), title || ' ' || description) > 0
	order by rank desc;
end;
$function$
;
