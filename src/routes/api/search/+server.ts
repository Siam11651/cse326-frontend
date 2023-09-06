import { supabase } from "$lib/server/supabaseclient.server";
import { esbuildVersion } from "vite";
import type { RequestEvent } from "./$types";
let req=
{
    recommendation:false,
    search_term:"",
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    req = await request.json();
    let ret_text;
    //console.log(req);
    if(req.recommendation == true)
    {

    let term=req.search_term
    let { data:result, error } = await supabase
    .rpc('preempt_search_service2', {
    term
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

    }
    else
    {
        let term=req.search_term
    let { data:result, error } = await supabase
    .rpc('search_service', {
    term
    })
    if (error)
    {
        ret_text={
            errorcode:-1
          }
          console.log(error);
    } 
    else
    {
        ret_text=result;
    }


    }
    

    //console.log(result);

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
