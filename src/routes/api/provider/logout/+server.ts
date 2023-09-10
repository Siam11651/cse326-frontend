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

  // if (jwt_token) {
  //   cookies.delete("pjwt", { path: "/" });
  // }
  let ret_text = {
    logged_out: true,
  };

  let response: Response = new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  let date: Date = new Date();

  date.setDate(date.getDate() - 7);

  let cookie: string = "pjwt=; HttpOnly; Expires=" + date.toUTCString();

  response.headers.append("Set-Cookie", cookie);

  return response;
}
