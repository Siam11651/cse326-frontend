import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";
import fs from "fs";

// function readFile(file: any) {
//   return new Promise((resolve, reject) => {
//     // Create file reader
//     let reader = new FileReader();
//     // Register event listeners
//     reader.addEventListener("loadend", (e) => resolve(e.target?.result));
//     reader.addEventListener("error", reject);
//     // Read file
//     reader.readAsArrayBuffer(file);
//   });
// }
// async function getAsByteArray(file: any) {
//   return new Uint8Array(await readFile(file));
// }

async function load_pfp(given_cname: string): Promise<any> {
  let { data: consumer_pfp, error } = await supabase
    .from("consumers")
    .select("imagefile")
    .eq("cname", given_cname);
  if (consumer_pfp) {
    return consumer_pfp;
  } else {
    return null;
  }
}

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;
  let token: string | undefined = cookies.get("cjwt");
  if (token) {
    let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY);
    let given_cname = decodedToken.name;

    let { data: result, error } = await supabase.rpc("get_consumer_details", {
      given_cname,
    });
    let pfp: any = load_pfp(given_cname);

    if (!pfp) {
      var pfpBuf = [];
      var buf = fs.readFileSync("../../api-assets/no_pfp.png").buffer;
      var arrayBuf = new Uint8Array(buf);
      for (var i = 0; i < arrayBuf.length; i++) {
        pfpBuf.push(arrayBuf[i]);
      }
      pfp = pfpBuf;
    }

    console.log(pfp);
    let singleResult = result[0];
    if (error) {
      ret_text = {
        errorcode: -1,
      };
    } else {
      singleResult.pfp = pfp;
      ret_text = singleResult;
    }
  } else {
    ret_text = {
      errorcode: -2,
    };
  }

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
