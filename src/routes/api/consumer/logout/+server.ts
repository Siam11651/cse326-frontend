import type { RequestEvent } from "./$types";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  const jwt_token = cookies.get("cjwt");
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
