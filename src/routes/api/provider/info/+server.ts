import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

async function load_pfp(given_pname: string): Promise<any> {
  let { data: provider_pfp, error } = await supabase
    .from("providers")
    .select("imagefile")
    .eq("pname", given_pname);
  if (provider_pfp) {
    return provider_pfp;
  } else {
    return null;
  }
}

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let token: string | undefined = cookies.get("pjwt");

  if (token) {
    // token ache user er, verify kore kaj sharbo
    let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY); // any dichhi lal dag shoraite, amar buk ta faita jaitese any deyar jonno, cringe
    let ret_text;
    let given_pname = decodedToken.name;

    let { data: result, error } = await supabase.rpc("get_provider_details", {
      given_pname,
    });

    let singleResult = result[0];
    
    let pfp: any = (await load_pfp(given_pname))[0].imagefile;

    if (pfp === null) {
      pfp = '/src/routes/api/api-assets/no_pfp.png';
    }
    
    if (error) {
      ret_text = {
        errorcode: -1,
      };
    } else {
      singleResult.pfp = pfp;
      ret_text = singleResult;
    }
    
    console.log(pfp);
    return new Response(JSON.stringify(ret_text), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // user er token i nai, pore handle korbo, bruh
    console.log("no token");
    return new Response(JSON.stringify({ errorcode: -2 }));
  }
}
