import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Navigation } from "./common/components/navigation";
import { cn } from "./lib/utils";
import { makeSSRClient } from "./supa-client";
import { getUserById } from "./features/users/queries";


console.log(stylesheet, "hi");

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const {client, headers} = makeSSRClient(request);
  const { data: { user }, } = await client.auth.getUser();
  if(user) {
    const profile = await getUserById(client, { profileId: user.id });  
    return { user, profile };
  }
  return { user: null, profile: null };
}

export default function App({loaderData}: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";
  const isLoggedIn = loaderData.user !==null;
  const profile = loaderData.profile;
  return (
    <div className={cn(
      `${pathname.startsWith("/auth") ? "p-0" : "p-5 lg:p-20"}`,
      isLoading && "transition-opacity animate-pulse")}>
      {pathname.startsWith("/auth") ? (
        <></>
      ) : (
        <Navigation isLoggedIn={isLoggedIn}
          hasNotifications={true}
          hasMessages={true}
          username={profile?.username}
          name={profile?.name}
          avatar={profile?.avatar}
        />
      )}
      <main>
        <Outlet context={{ 
          isLoggedIn,
          name: profile?.name,
          username: profile?.username,
          avatar: profile?.avatar,
          }}/>
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let errorCode: string | undefined;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    // Handle custom error responses
    if (error.data?.error_code && error.data?.message) {
      errorCode = error.data.error_code;
      message = errorCode || "Error";
      details = error.data.message;
    } else {
      // Handle standard route errors
      message = error.status === 404 ? "404" : "Error";
      details =
        error.status === 404
          ? "The requested page could not be found."
          : error.statusText || details;
    }
    console.log(error);
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{message}</h1>
        <p className="text-lg text-gray-600 mb-8">{details}</p>
        {errorCode && (
          <p className="text-sm text-gray-500 mb-4">Error Code: {errorCode}</p>
        )}
        {import.meta.env.DEV && stack && (
          <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded-lg text-left">
            <code className="text-sm">{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}