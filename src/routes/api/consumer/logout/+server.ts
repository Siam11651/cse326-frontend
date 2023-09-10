import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  const jwt_token = cookies.get("cjwt");

  if(!jwt_token)
  {
    return new Response();
  }

  let decodedToken: any = jwt.verify(jwt_token, import.meta.env.VITE_JWT_KEY);

  if(!decodedToken)
  {
    return new Response();
  }

  if (jwt_token) {
    cookies.delete("cjwt", { path: "/" });
  }
  let ret_text = {
    logged_out: true,
  };

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
