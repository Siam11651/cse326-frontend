CREATE OR REPLACE FUNCTION public.preempt_search_primaryservice(term character varying)
 RETURNS TABLE(pserviceid integer, ptitle character varying, pdescription text, ranking real)
 LANGUAGE plpgsql
AS $function$ 
begin
	return query SELECT
		primaryservicetypes.pserviceid, 
		primaryservicetypes.title,
		primaryservicetypes.description,
		ts_rank( '{1.0,0.2,0.0,0.0}', textsearchable_index_col || textsearchable_index_description , query) as rank
	FROM
		primaryservicetypes, to_tsquery('english', coalesce(term, '')) query
	WHERE
		query @@ (textsearchable_index_col || textsearchable_index_description )
		OR
		(coalesce(term, '')) <% (title || ' ' || description)
		OR
		difference( (coalesce(term, '')), title || ' ' || description) > 0
		order by rank desc
		limit 5;
end;
$function$
;
