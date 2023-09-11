import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";


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
  

  
    
    let requestBody = await request.json();
    let ret_text;
    let given_pid = requestBody.pid;

    let { data: result, error } = await supabase.rpc("get_provider_details2", {
      given_pid,
    });

    let singleResult = result[0];
    
    let pfp: any = (await load_pfp(singleResult.pname))[0].imagefile;

    if (pfp === null) {
      pfp = 'no_pfp.png';
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
  } 

