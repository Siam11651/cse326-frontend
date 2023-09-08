import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

import jwt from "jsonwebtoken";
let user = {
  name: "",
  email: "",
  password_hash: "",
  contact: "",
  pfp: null,
  address: "",
  area: "",
  id: 0,
};
export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  const user = await request.json();
  console.log(user);
  let given_cname = user.name;
  let given_mail = user.email;
  let token: string | null = null;
  let { data: result, error } = await supabase.rpc("is_consumer_in_table", {
    given_cname,
    given_mail,
  });
  let ret_text;
  if (error) {
    console.log("query wrong: ", error);
    ret_text = {
      errorcode: -1,
    };
  } else {
    if (result == true) {
      console.log("user already exists");
      ret_text = {
        errorcode: -2,
      };
    } else {
      let given_billingaddress = user.address;
      let given_cname = user.name;
      let given_contactnumber = user.contact;
      let given_imagefile = null;
      if (user.pfp != null) {
        given_imagefile = user.pfp;
      }
      let given_mail = user.email;
      let given_security_key = user.password_hash;

      let { data: result, error } = await supabase.rpc("add_a_consumer", {
        given_billingaddress,
        given_cname,
        given_contactnumber,
        given_imagefile,
        given_mail,
        given_security_key,
      });

      if (error) {
        console.log("insert db error");
        console.log(error);
        ret_text = {
          errorcode: -3,
        };
      } else {
        console.log("insert done");
        let ret_user = {
          id: result,
          is_consumer: true,
          name: user.name,
        };
        token = jwt.sign(ret_user, import.meta.env.VITE_JWT_KEY, {
          expiresIn: `${15 * 86400 * 1000}`,
        });
        ret_text = {
          errorcode: 0,
          //jwt_token:token
        };
      }
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

    cookie += date.toUTCString();

    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}
