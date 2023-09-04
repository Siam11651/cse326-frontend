import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    const body = await request.json();
    console.log(body);
    const { data: existingconsumer } = await supabase.from("consumers").select().eq('name', 'alpha').single();
    return new Response(null);
}
