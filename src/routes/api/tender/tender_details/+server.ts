import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;

  let requestBody = await request.json();
  let given_tenderid = requestBody.tender_id;

  let { data:result, error } = await supabase
  .rpc('get_single_tender_details', {
    given_tenderid
  })

if (error)
{
    ret_text={
        errocode:-1,
    };

} 
else 
{
    ret_text = result;
}


  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
