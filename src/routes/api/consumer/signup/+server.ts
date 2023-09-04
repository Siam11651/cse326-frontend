import { supabase } from "$lib/server/supabaseclient";
import type { RequestEvent } from "./$types";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    const body = await request.json();
    console.log(body);
    let consumer{
        name: string;
        email: string;
        username: string;
        password: string;
      }
    const { data: existingconsumer } = await supabase.from("consumers").select().eq('name', 'alpha').single();
    console.log(consumer);
    return new Response(null);
}
