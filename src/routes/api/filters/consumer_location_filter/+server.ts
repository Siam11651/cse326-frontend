import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    let token: string | undefined = cookies.get("cjwt");
    let ret_text;
    if(token)
    {
    let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY);    
    let given_consumerid=decodedToken.id;
    let given_serviceid=1;
    let { data:result, error } = await supabase
    .rpc('filter_provider_matching_consumer_locn', {
        given_consumerid,
        given_serviceid
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
    else
    {
        ret_text={
            errorcode:-2
          } 
    }
    


        

    //console.log(result);

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
