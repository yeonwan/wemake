import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/magic/flickering-grid";

export function meta() {
  return [
    { title: "Authentication | WeMake" },
    { name: "description", content: "Sign in or create an account" },
  ];
}
``
export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:block">
        <FlickeringGrid
          gridGap={5}
          color="red"
          maxOpacity={0.5}
          flickerChance={0.2}
        />
      </div>
      <Outlet />

    </div>
  );
} 