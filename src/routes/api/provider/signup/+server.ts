import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

import jwt from 'jsonwebtoken';
let provider =
{
    name:'',
    email:'',
    password_hash:'',import { supabase } from "$lib/server/supabaseclient.server";
    import type { RequestEvent } from "./$types";
    import jwt from "jsonwebtoken";
    
    export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
      let token: string | undefined = cookies.get("pjwt");
    
      if(token)
      {
        let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY); // any dichhi lal dag shoraite, amar buk ta faita jaitese any deyar jonno, cringe
        let ret_text;
        let given_pid = decodedToken.id;
    
        let { data: result, error } = await supabase
          .rpc('get_provider_servicelist', {
            given_pid
          })
        if (error) {
          console.log(error);
    
          ret_text = {
            errorcode: -1
          }
        }
        else {
          ret_text = result;
        }
    
        return new Response(JSON.stringify(ret_text), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
    contact:'',
    pfp:null,
    address:'',
    area:'',
    id:0,
    nid_num:'',
    nid_copy:null
}
export async function POST({request, cookies}: RequestEvent): Promise<Response>
{ 
  const provider = await request.json();
  console.log(provider); 
  let given_pname=provider.name;
  let given_mail=provider.email;
  let { data:result, error } = await supabase
  .rpc('is_provider_in_table', {
    given_pname,
    given_mail
  })
  let ret_text;
  let token: string | null = null;
  if (error) 
  {
    console.log("quert wrong");
    ret_text={
      errorcode:-1
    }
  }
  else 
  {
    if(result == true)
    {
      console.log("provider already exists");
      ret_text={
          errorcode:-2
      }

    }
    else
    {
      let given_contactaddress=provider.address; 
      let given_pname=provider.name; 
      let given_contactnumber=provider.contact; 
      let given_imagefile=null;
      let given_local=provider.region;
      if(provider.pfp!=null)
      {
        given_imagefile=provider.pfp;
      } 
      let given_mail=provider.email; 
      let given_security_key=provider.password_hash;
      let given_nidnumber="";
      let given_nidcopy=null;
      if(provider.nid_copy!=null)
      {
        given_nidcopy=provider.nid_copy;
      } 
      let { data:result, error } = await supabase
      .rpc('insert_providers', {
        given_contactaddress,
        given_local,
        given_nidcopy,
        given_nidnumber, 
        given_pname, 
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
        let ret_provider=
        {
          id:result,
          is_consumer:false,
          name:provider.name
        }
        token = jwt.sign(ret_provider, import.meta.env.VITE_JWT_KEY, { expiresIn: `${15 * 86400 * 1000}` });
        ret_text={
          errorcode:0
          // jwt_token:token
        }
        
      }
    }
  }

  let response: Response = new Response(JSON.stringify(ret_text),{
    headers: {
      'Content-Type': 'application/json'
    }
	});

  if(token)
  {
    let cookie: string = "pjwt=" + token + "; HttpOnly; Path=/; Expires="; // pjwt mane provider er
    let date: Date = new Date();
    
    date.setDate(date.getDate() + 7);

    cookie += date.toUTCString();

    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}
