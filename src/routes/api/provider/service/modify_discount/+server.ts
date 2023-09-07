import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
  let token: string | undefined = cookies.get("pjwt");

  if(token)
  {
    let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY); // any dichhi lal dag shoraite, amar buk ta faita jaitese any deyar jonno, cringe
    let ret_text;
    let given_pid = decodedToken.id;

    // extract data from body
    let modification_data = await request.json();
    let given_discount = modification_data.discount;
    let given_serviceid = modification_data.serviceid;

    let { data: result, error } = await supabase
      .rpc('modify_discount', {
        given_discount,
        given_pid,
        given_serviceid,
        
      })
    if (error) {
      console.log(error);

      ret_text = {
        errorcode: -1
      }
    }
    else {
        // as only addable services would be shown, we assume it passes all checks in add_service_to_provider
      ret_text = result;
    }

    return new Response(JSON.stringify(ret_text), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}