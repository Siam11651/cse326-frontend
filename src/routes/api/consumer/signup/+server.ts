import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

import jwt from 'jsonwebtoken';
let user =
{
    name:'',
    email:'',
    password_hash:'',
    contact:'',
    pfp:null,
    address:'',
    area:'',
    id:0
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
    console.log("querry wrong");
    ret_text={
      errorcode:-1
    }
  }
  else 
  {
    if(result == true)
    {
      console.log("user already exists");
      ret_text={
          errorcode:-2
      }

    }
    else
    {
        
      let given_billingaddress=user.address; 
      let given_cname=user.name; 
      let given_contactnumber=user.contact; 
      let given_imagefile=null;
      if(user.pfp!=null)
      {
        given_imagefile=user.pfp;
      } 
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
      });

      if (error) 
      {
        console.log("insert db error");
        console.log(error);
        ret_text={
          errorcode:-3
        }
      }
      else 
      {
        console.log("insert done");
        let ret_user=
        {
          id:result,
          is_consumer:true
        }
        const token = jwt.sign(ret_user, import.meta.env.VITE_JWT_KEY, { expiresIn: `${15 * 86400 * 1000}` });
        ret_text={
          errorcode:0,
          jwt_token:token
        }
        
      }
    }
  }

    return new Response(JSON.stringify(ret_text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
