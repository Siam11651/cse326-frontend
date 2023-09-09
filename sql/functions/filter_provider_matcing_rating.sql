CREATE OR REPLACE FUNCTION public.filter_provider_service_matching_rating(given_serviceid integer, given_rating numeric)
 RETURNS TABLE(pid integer, pname character varying, mail character varying, contactnumber character varying, contactaddress character varying, createdate timestamp without time zone, imagefile bytea, discountpercentage numeric, ratingrank numeric, totalcost numeric, plocal_area character varying)
 LANGUAGE plpgsql
AS $function$
declare
	_basecost integer:=null;
	_cost integer:=null;
begin
	select s.basecost into _basecost from public.servicetypes s where s.serviceid = given_serviceid;
	return query
		select
			p.pid ,
			p.pname ,
			p.mail ,
			p.contactnumber ,
			p.contactaddress ,
			p.createdate ,
			p.imagefile ,
			p2.discountpercentage,
			coalesce (
				(
				select	
					avg(r.rating)
				from
					ratingreview r
				where
					r.pid = p.pid
					and r.reviewerisprovider = false 
				)
			, 0) as ratingrank,
			(_basecost - _basecost * (p2.discountpercentage / 100.0)) as totalcost,
			p.local_area
		from
			public.providers p
			join public.providerservicetypes p2 on
			p.pid = p2.pid
		where
			p2.serviceid = given_serviceid
			and
			coalesce (
				(
				select	
					avg(r.rating)
				from
					ratingreview r
				where
					r.pid = p.pid
					and r.reviewerisprovider = false 
				)
			, 0) = given_rating
		order by
			ratingrank desc;
end;
$function$
;
