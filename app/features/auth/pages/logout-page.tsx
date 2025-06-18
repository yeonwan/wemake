import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/logout-page";
import { redirect } from "react-router";

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  
  // Sign out from Supabase
  await client.auth.signOut();
  
  // Create new headers to clear cookies
  const newHeaders = new Headers(headers);
  
  // Clear all cookies by setting them to expire
  const cookies = request.headers.get('cookie')?.split(';') || [];
  cookies.forEach(cookie => {
    const [name] = cookie.trim().split('=');
    if (name) {
      // Set cookie to expire immediately
      newHeaders.append('Set-Cookie', `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`);
    }
  });
  
  // Add cache control headers to prevent caching
  newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  newHeaders.set('Pragma', 'no-cache');
  newHeaders.set('Expires', '0');
  
  // Redirect to home page with new headers
  return redirect("/", {
    headers: newHeaders
  });
};
