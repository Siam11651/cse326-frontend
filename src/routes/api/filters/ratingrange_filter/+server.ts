import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let req = await request.json();
  let ret_text;
  let starting_rate = req.starting_rate;
  let ending_rate = req.ending_rate;
  let given_serviceid = req.given_serviceid;
  let { data: result, error } = await supabase.rpc(
    "filter_provider_service_by_rating",
    {
      ending_rate,
      given_serviceid,
      starting_rate,
    }
  );
  if (error) {
    ret_text = {
      errorcode: -1,
    };
    console.log(error);
  } else {
    ret_text = result;
  }

  //console.log(result);

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
