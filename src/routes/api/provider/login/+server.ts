import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;

  let provider = await request.json();
  console.log(provider);
  let given_pname = provider.name;
  let given_key = provider.password_hash;

  let token: string | null = null;

  let { data: result, error } = await supabase.rpc("can_log_in_provider", {
    given_key,
    given_pname,
  });

  if (error) {
    console.log(error);
    ret_text = {
      errorcode: -1,
    };
  } else {
    if (result == true) {
      let { data: result, error } = await supabase.rpc("get_provider_details", {
        given_pname,
      });
      if (error) {
        console.log(error);
        ret_text = {
          errorcode: -1,
        };
      } else {
        console.log(result[0]._pid, " at 39 of s/r/a/p/l");
        let ret_provider = {
          id: result[0]._pid,
          is_consumer: false,
          name: provider.name,
        };
        token = jwt.sign(ret_provider, import.meta.env.VITE_JWT_KEY, {
          expiresIn: `${15 * 86400 * 1000}`,
        });
        ret_text = {
          errorcode: 0,
          // jwt_token: token
        };
      }
    } else {
      console.log("wrong password or provider name");
      ret_text = {
        errorcode: -2,
      };
    }
  }

  let response: Response = new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (token) {
    let cookie: string = "pjwt=" + token + "; HttpOnly; Expires="; // pjwt mane provider er
    let date: Date = new Date();

    date.setDate(date.getDate() + 7);

    cookie += date.toUTCString();

    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}
