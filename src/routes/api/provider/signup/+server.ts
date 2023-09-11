import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";
import { writeFile } from "fs";
import { fileTypeFromBuffer } from "file-type";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  const provider = await request.json();
  console.log(provider);
  let given_pname = provider.name;
  let given_mail = provider.email;
  let { data: result, error } = await supabase.rpc("is_provider_in_table", {
    given_pname,
    given_mail,
  });
  let ret_text;
  let token: string | null = null;
  if (error) {
    console.log("quert wrong");
    ret_text = {
      errorcode: -1,
    };
  } else {
    if (result == true) {
      console.log("provider already exists");
      ret_text = {
        errorcode: -2,
      };
    } else {
      let given_contactaddress = provider.address;
      let given_pname = provider.name;
      let given_contactnumber = provider.contact;

      let given_local = provider.region;

      let given_mail = provider.email;
      let given_security_key = provider.password_hash;
      let given_nidnumber = provider.nidnumber;
      let given_nidcopy = null;
      if (provider.nid_copy != null) {
        given_nidcopy = provider.nid_copy;
      }
      let { data: result, error } = await supabase.rpc("insert_providers", {
        given_contactaddress,
        given_local,
        given_nidcopy,
        given_nidnumber,
        given_pname,
        given_contactnumber,
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
        let ret_provider = {
          id: result,
          is_consumer: false,
          name: provider.name,
        };
        token = jwt.sign(ret_provider, import.meta.env.VITE_JWT_KEY, {
          expiresIn: `${15 * 86400 * 1000}`,
        });
        ret_text = {
          errorcode: 0,
          // jwt_token:token
        };
        if (provider.pfp) {
          let extension: string | undefined;

          let byteArray: Uint8Array = new Uint8Array(provider.pfp.length);

          for (let i: number = 0; i < provider.pfp.length; ++i) {
            byteArray[i] = provider.pfp[i];
          }

          let pfpBuffer: Buffer = Buffer.from(byteArray);
          extension = (await fileTypeFromBuffer(pfpBuffer))?.ext;

          writeFile(
            `static/pfp/provider/${ret_provider.id}.${extension}`,
            pfpBuffer,
            (err): void =>
            {
              console.log(err);
            }
          );

          let given_pid = ret_provider.id;
          let given_imagefile = `${ret_provider.id}.${extension}`;
          console.log(given_imagefile);
          let { data, error } = await supabase.rpc("add_provider_pfp", {
            given_pid,
            given_imagefile,
          });

          if (error) {
            console.log(error);
          }
        }
      }
    }
  }

  let response: Response = new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (token) {
    let cookie: string = "pjwt=" + token + "; HttpOnly; Path=/; Expires="; // pjwt mane provider er
    let date: Date = new Date();

    date.setDate(date.getDate() + 7);

    cookie += date.toUTCString();

    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}
