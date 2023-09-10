import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import { getDistance } from "geolib";

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
    //sorting distance wise
    var i, j, temp;
    var swapped;
    for (i = 0; i < result.length - 1; i++) 
    {
        swapped = false;
        for (j = 0; j < result.length - i - 1; j++) 
        {
            if (result[j].distance > result[j + 1].distance) 
            {
                // Swap arr[j] and arr[j+1]
                temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }
  
        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
        break;
    }

    ret_text = result;
  }

  //console.log(result);

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
