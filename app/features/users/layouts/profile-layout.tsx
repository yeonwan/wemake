import { Form, Link, NavLink, Outlet, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";

export default function ProfileLayout() {

  return (
    <div className="py-5 space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src="https://github.com/yeonwan.png"/>
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <Button variant="outline" asChild>
              <Link to="/my/settings">
                Edit Profile
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  Send a message to John Doe
                  <Form className="mt-4 space-y-4">
                    <Textarea 
                      className="resize-none"
                      rows={4} 
                      placeholder="Message" />
                    <Button type="submit">Send</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@John Doe</span>
            <Badge variant="secondary">
              Product Designer
            </Badge>
            <Badge variant="secondary">
              100 followers
            </Badge>
            <Badge variant="secondary">
              100 following
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        {[
          {label: "About", to: "/users/username"},
          {label: "Products", to: "/users/username/products"},
          {label: "Posts", to: "/users/username/posts"},
        ].map(({label, to}) => (
          <NavLink
            end 
            to={to} 
            key={label}
            className={({isActive}) =>
               cn(
                buttonVariants({variant:"outline"}),
                isActive && "bg-accent text-foreground"
               )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet />
      </div>
    </div>
  );
} 