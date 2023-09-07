import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {

  let token: string | undefined = cookies.get("pjwt");

  if(token)
  {
    // token ache user er, verify kore kaj sharbo
    let decodedToken = jwt.verify(token, import.meta.env.VITE_JWT_KEY); // any dichhi lal dag shoraite, amar buk ta faita jaitese any deyar jonno, cringe
    let ret_text;
    let given_pname = decodedToken.name;

    let { data: result, error } = await supabase
    .rpc('get_provider_details', {
      given_pname
    })
    if (error) {
      ret_text = {
        errorcode: -1
      }
    }
    else {
      ret_text = result;
    }

    return new Response(JSON.stringify(ret_text), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  else
  {
    // user er token i nai, pore handle korbo, bruh
    console.log("no token");
    return new Response();
  }
}