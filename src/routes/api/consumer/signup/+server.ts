import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
let user =
{
    name:'',
    email:'',
    password_hash:'',
    contact:'',
    pfp:null,
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
    const user = await request.json();
    console.log(user); 
    let given_cname=user.name;
    let given_mail=user.email;
    let { data:result, error } = await supabase
    .rpc('is_consumer_in_table', {
        given_cname,
        given_mail
    })
  let ret_text;
  if (error) 
  {
    ret_text={
        success:false,
        errorcode:-1
    }
  }
  else 
  {
    if(result == true)
    {
        ret_text={
            success:false,
            errorcode:-2
        }

    }
    else
    {
        
  let given_billingaddress=''; 
  let given_cname=user.name; 
  let given_contactnumber=user.contact; 
  let given_imagefile=null;
//   if(user.pfp)
//   {
//     given_imagefile=user.pfp;
//   } 
  let given_mail=user.email; 
  let given_security_key=user.password_hash;
        
let { data:result, error } = await supabase
.rpc('insert_consumer', {
  given_billingaddress, 
  given_cname, 
  given_contactnumber, 
  given_imagefile, 
  given_mail, 
  given_security_key
})

if (error) 
{
    ret_text={
        success:false,
        errorcode:-3
    }
}
else 
{
    ret_text={
        success:true,
        errorcode:0,
    }
    console.log(result);
}

    }

  }

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
