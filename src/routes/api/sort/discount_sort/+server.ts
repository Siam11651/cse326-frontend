import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let req = await request.json();
  let ret_text;
  let given_serviceid = req.service_id;
  let { data: result, error } = await supabase.rpc(
    "get_matching_providers_service_discount",
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
    ret_text = result;
  }

  //console.log(result);

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
