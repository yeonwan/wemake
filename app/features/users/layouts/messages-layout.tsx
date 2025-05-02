import { Outlet } from "react-router";
import { Sidebar, SidebarMenu, SidebarContent, SidebarGroup, SidebarMenuItem } from "~/common/components/ui/sidebar";
import { SidebarProvider } from "~/common/components/ui/sidebar";
import MessageRoom from "../components/message-room";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="flex max-h-[calc(100vh-10rem)] overflow-hidden h-[calc(100vh-10rem)] min-h-full">
      <Sidebar className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <MessageRoom
                    key={index}
                    avatarUrl="https://github.com/shadcn.png"
                    avatarFallback="CN"
                    name={`John Doe ${index}`}
                    lastMessage={`Last message ${index}`}
                    id={`${index}`}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}