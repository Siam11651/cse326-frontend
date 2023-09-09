import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;
  let token: string | undefined = cookies.get("pjwt");

  if (token) {
    // any defeats point of type setting, temporary for now
    let decodedToken: any | string = jwt.verify(
      token,
      import.meta.env.VITE_JWT_KEY
    );
    let _pid = decodedToken.id;

    let { data: result, error } = await supabase.rpc("get_rating_of_provider", {
      _pid,
    });
    if (error) {
      ret_text = {
        errorcode: -1,
      };
    } else {
      ret_text = result;
    }
  } else {
    ret_text = {
      errorcode: -2,
    };
    console.log("No Token");
  }

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
