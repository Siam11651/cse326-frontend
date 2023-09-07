CREATE OR REPLACE FUNCTION public.get_rating_of_provider(_pid integer)
 RETURNS real
 LANGUAGE plpgsql
AS $function$
declare 
	_rating real:=0;
begin
	_rating := coalesce (
			(
			select	
				avg(r.rating)
			from
				ratingreview r
			where
				r.pid = _pid
				and r.reviewerisprovider = false 
			)
			,0	
			);
	return _rating;
end;

	
$function$
;
