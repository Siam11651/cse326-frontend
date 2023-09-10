import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  const jwt_token = cookies.get("pjwt");

  if(!jwt_token)
  {
    return new Response();
  }

  let decodedToken: any = jwt.verify(jwt_token, import.meta.env.VITE_JWT_KEY);

  if(!decodedToken)
  {
    return new Response();
  }

  let ret_text = {
    logged_out: true,
  };

  let response: Response = new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // cookies.delete("pjwt", { path: "/" });

  let date: Date = new Date();

  date.setTime(date.getTime() - 7);

  response.headers.set("Set-Cookie", "pjwt=; HttpOnly; Expires=" + date.toUTCString());

  return response;
}
