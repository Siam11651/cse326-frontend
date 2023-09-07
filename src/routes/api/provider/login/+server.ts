import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
  let ret_text;

  let provider = await request.json();
  console.log(provider);
  let given_pname = provider.name;
  let { data: result, error } = await supabase
  .rpc('get_provider_details', {
    given_pname
  })

  let token: string | null = null;

  if (error) {
    console.log(error);
    ret_text = {
      errorcode: -1
    }

  }
  else {
    if (result.pid != null) {
      //console.log(result.security_key);
      //console.log(provider.password_hash);
      if (result.security_key == provider.password_hash) {
        console.log("provider exist");
        let ret_provider =
        {
          id: result.pid,
          is_consumer: false,
          name: provider.name
        }
        token = jwt.sign(ret_provider, import.meta.env.VITE_JWT_KEY, { expiresIn: `${15 * 86400 * 1000}` });
        ret_text = {
          errorcode: 0
          // jwt_token: token
        }
      }
      else {
        console.log("wrong password");
        ret_text = {
          errorcode: -2
        }
      }

    }
    else {
      console.log("provider does not exist");
      ret_text = {
        errorcode: -3
      }

    }
  }

  let response: Response = new Response(JSON.stringify(ret_text),{
    headers: {
      'Content-Type': 'application/json'
    }
	});

  if(token)
  {
    let cookie: string = "pjwt=" + token + "; HttpOnly; Expires="; // pjwt mane provider er
    let date: Date = new Date();
    
    date.setDate(date.getDate() + 7);

    cookie += date.toUTCString();

    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}