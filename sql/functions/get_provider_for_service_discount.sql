CREATE OR REPLACE FUNCTION public.get_matching_providers_service_discount(given_serviceid integer)
 RETURNS TABLE(pid integer, pname character varying, mail character varying, contactnumber character varying, contactaddress character varying, createdate timestamp without time zone, imagefile bytea, local_area character varying, discountpercentage numeric, ratingrank numeric, totalcost numeric)
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
			p.local_area ,
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
			(_basecost - _basecost * (p2.discountpercentage / 100.0)) as totalcost
		from
			public.providers p
			join public.providerservicetypes p2 on
			p.pid = p2.pid
		where
			p2.serviceid = given_serviceid
		order by
			p2.discountpercentage desc;
end;
$function$
;
