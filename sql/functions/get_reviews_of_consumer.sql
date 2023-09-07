CREATE OR REPLACE FUNCTION public.get_reviews_of_consumer(_consumerid integer)
 RETURNS TABLE(review text, rating numeric)
 LANGUAGE plpgsql
AS $function$
begin
	return query 
		select r.review, r.rating 
		from public.ratingreview r 
		where r.consumerid = _consumerid and r.reviewerisprovider = true;
end;

	
$function$
;
