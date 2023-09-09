CREATE OR REPLACE FUNCTION public.get_rating_of_consumer(_cid integer)
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
				r.consumerid  = _cid
				and r.reviewerisprovider = true 
			)
			,0	
			);
	return _rating;
end;

	
$function$
;
