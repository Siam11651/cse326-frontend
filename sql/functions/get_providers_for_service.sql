CREATE OR REPLACE FUNCTION public.get_matching_providers_consumers_byname(given_servicetitle character varying, given_consumername character varying)
 RETURNS TABLE(pid integer, pname character varying, mail character varying, contactnumber character varying, contactaddress character varying, createdate timestamp without time zone, imagefile bytea, local_area character varying, discountpercentage numeric, ratingrank numeric)
 LANGUAGE plpgsql
AS $function$
declare
	_consumerid integer:= null;
	_serviceid integer:= null;
begin
	select c.consumerid into _consumerid from public.consumers c where c.cname = given_consumername;
	select s.serviceid into _serviceid from public.servicetypes s where s.title = given_servicetitle;
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
			, 0) as ratingrank
		from
			public.providers p
			join public.providerservicetypes p2 on
			p.pid = p2.pid
		where
			p2.serviceid = _serviceid
		order by
			ratingrank + public.get_matching_local_area_count(p.pid, _consumerid) desc;
end;
$function$
;
