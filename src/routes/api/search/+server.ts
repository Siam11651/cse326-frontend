import { supabase } from "$lib/server/supabaseclient.server";
import { Recommendation } from "../../Recommendation";
import type { RequestEvent } from "./$types";
let req=
{
    recommendation:"",
    search_term:"",
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    req = await request.json();
    //console.log(req);
    let term=req.search_term
    let { data:result, error } = await supabase
    .rpc('preempt_search_service2', {
    term
    })

    if (error) console.error(error)

    console.log(result);

    return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
