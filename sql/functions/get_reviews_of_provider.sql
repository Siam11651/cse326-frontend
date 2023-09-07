CREATE OR REPLACE FUNCTION public.get_reviews_of_provider(_pid integer)
 RETURNS TABLE(review text, rating numeric)
 LANGUAGE plpgsql
AS $function$
begin
	return query 
		select r.review, r.rating 
		from public.ratingreview r 
		where r.pid = _pid and r.reviewerisprovider = false;
end;

	
$function$
;
