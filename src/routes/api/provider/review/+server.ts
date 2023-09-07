import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{
    let ret_text;
    let token: string | undefined = cookies.get("pjwt");
    
    if(token)
    {
      let decodedToken = jwt.verify(token, import.meta.env.VITE_JWT_KEY);
      let _pid=decodedToken.id;

            let { data:result, error } = await supabase
              .rpc('get_reviews_of_provider', {
                _pid
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
      console.log("No Token");
    }



    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}