import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;
  let token: string | null = null;
  let user = await request.json();
  console.log(user);
  let given_cname = user.name;
  let given_key = user.password_hash;
  let { data: result, error } = await supabase.rpc("can_log_in_consumer", {
    given_cname,
    given_key,
  });

  if (error) {
    console.log("Query wrong: ", error);
    ret_text = {
      errorcode: -1,
    };
  } else {
    if (result == true) {
      console.log("consumer exist: ", given_cname);
      let { data: result, error } = await supabase.rpc("get_consumer_details", {
        given_cname
      });
      if (error) {
        console.log("Query wrong: ", error);
        ret_text = {
          errorcode: -1,
        };
      } else {
        
        let ret_user = {
          id: result[0]._consumerid,
          is_consumer: true,
          name: user.name,
        };
        ret_text = {
          errorcode: 0,
          //jwt_token:token
        };
        token = jwt.sign(ret_user, import.meta.env.VITE_JWT_KEY, {
          expiresIn: `${15 * 86400 * 1000}`,
        });

        
      }
    } else {
      console.log("wrong password or consumer name");
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
    let cookie: string = "cjwt=" + token + "; HttpOnly; Path=/; Expires="; // pjwt mane provider er
    let date: Date = new Date();

    date.setDate(date.getDate() + 7);
    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}
