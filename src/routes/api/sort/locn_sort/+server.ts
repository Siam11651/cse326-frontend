import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import { getDistance } from "geolib";

function GetDistance(lon1: number, lat1: number, lon2: number, lat2: number): number
{
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // in metres
}

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let req = await request.json();
  console.log("locn: ", req);
  let ret_text;
  let given_serviceid = req.service_id;
  let { data: result, error } = await supabase.rpc(
    "get_matching_providers_service_default",
    {
      given_serviceid,
    }
  );
  if (error) {
    ret_text = {
      errorcode: -1,
    };
    console.log(error);
  } else {
    let consumer_coords = {
      lat: req.latitude,
      lon: req.longitude,
    };

    for (let i = 0; i < result.length; i++) {
      let provider_coords = {
        lat: result[i].coordinates.split(",")[0],
        lon: result[i].coordinates.split(",")[1],
      };
      result[i].distance = getDistance(consumer_coords, provider_coords);
    }

    result.sort((left: any, right: any): number =>
    {
      let leftCoordinates: {lon: number, lat: number} =
      {
        lat: left.coordinates.split(",")[0],
        lon: left.coordinates.split(",")[0]
      };
      let rightCoordinates: {lon: number, lat: number} =
      {
        lat: right.coordinates.split(",")[0],
        lon: right.coordinates.split(",")[0]
      };
      let distanceLeft: number = getDistance(consumer_coords, leftCoordinates);
      let distanceRight: number = getDistance(consumer_coords, rightCoordinates);

      if(distanceLeft < distanceRight)
      {
        return 1;
      }
      else if(distanceLeft === distanceRight)
      {
        return 0;
      }
      else
      {
        return -1;
      }
    });

    ret_text = result;
  }

  //console.log(result);

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
