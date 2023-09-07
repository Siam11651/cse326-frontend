import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{
    let ret_text;
    let token: string | undefined = cookies.get("cjwt");
    if(token)
    {
      let decodedToken = jwt.verify(token, import.meta.env.VITE_JWT_KEY);
      let given_cname=decodedToken.name;

let { data:result, error } = await supabase
  .rpc('get_consumer_details', {
    given_cname
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
      ret_text={
        errorcode:-2
      }
    }


    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}