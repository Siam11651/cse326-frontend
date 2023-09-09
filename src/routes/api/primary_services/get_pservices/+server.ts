import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({request,cookies,}: RequestEvent): Promise<Response> {
    let ret_text;


const { data:result, error } = await supabase
.from('primaryservicetypes')
.select('pserviceid')

if(error)
{
    ret_text = {
        errorcode: -1,
      };
}
else
{
    ret_text=result;
}

    return new Response(JSON.stringify(ret_text), {
        headers: {
          "Content-Type": "application/json",
        },
      });

}