import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{
    let ret_text;
    let requestObject = await request.json();

let given_serviceid= requestObject.service_id;
let { data:result, error } = await supabase
.rpc('get_matching_providers_service', {
  given_serviceid
})

if (error) 
{
    ret_text={
        errorcode:-1
      }
}
else 
{
    ret_text=result;
}

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}