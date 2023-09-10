import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import {getDistance} from 'geolib';

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let req = await request.json();
  console.log("locn: " , req);
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
        lon: req.longitude
    }
    let provider_coords = {
        lat: result.coordinates.split(',')[0],
        lon: result.coordinates.split(',')[1]
    }

    let distance = getDistance(consumer_coords, provider_coords);
    result.distance = distance;
    ret_text = result;
  }

  //console.log(result);

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
