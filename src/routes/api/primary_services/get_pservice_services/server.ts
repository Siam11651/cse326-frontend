import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({request,cookies,}: RequestEvent): Promise<Response> {
    let ret_text;

let given_pserviceid=101;
const { data:result, error } = await supabase
.from('servicetypes')
.select()
.eq('pserviceid',given_pserviceid)

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