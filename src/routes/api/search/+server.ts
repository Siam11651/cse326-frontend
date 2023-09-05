import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    const req = await request.json();
    console.log(req);
let term='clean'
let { data:result, error } = await supabase
.rpc('search_service', {
  term
})

if (error) console.error(error)


    return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
