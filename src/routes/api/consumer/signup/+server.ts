import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
let user =
{
    name:"",
    email:"",
    password_hash:"",
    contact:"",
    nid:"",
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    const user = await request.json();
    console.log(user);
    const { data: existingconsumer } = await supabase.from("consumers").select().eq('name', user.name).eq('email', user.email).single();
    return new Response(JSON.stringify(existingconsumer), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
