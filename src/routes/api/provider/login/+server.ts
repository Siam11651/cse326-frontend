import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from 'jsonwebtoken';
let provider =
{
    name:'',
    password_hash:'',
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    let ret_text;

    let provider = await request.json();
    console.log(provider);
    let given_cname=provider.name;
let { data:result, error } = await supabase
.rpc('get_consumer_details', {
  given_cname
})

if (error)
{
    console.log("Querry wrong");
    ret_text={
        errorcode:-1
      }

} 
else
{
    if(result.consumerid!=null)
    {
        //console.log(result.security_key);
        //console.log(provider.password_hash);
        if(result.security_key==provider.password_hash)
    {
        console.log("provider exist");
        let ret_provider=
        {
          id:result.consumerid,
          is_consumer:true
        }
        const token = jwt.sign(ret_provider, import.meta.env.VITE_JWT_KEY, { expiresIn: `${15 * 86400 * 1000}` });
        ret_text={
          errorcode:0,
          jwt_token:token
        }
    }
    else
    {
        console.log("wrong password");
        ret_text={
            errorcode:-2
          }
    }

    }
    else
    {
        console.log("provider does not exist");
        ret_text={
            errorcode:-3
          }
        
    }
    
    
} 

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}