import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { NavigationMenu } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BarChart3Icon, BellIcon, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "See the top performers in your community",
                to: "/products/leaderboards"
            },
            {
                name: "Categories",
                description: "See the categories of products",
                to: "/products/categories"
            },
            {
                name: "Search",
                description: "Search for a specific user",
                to: "/products/search"
            },
            {
                name: "Submit a Product",
                description: "Submit a new product to our community",
                to: "/products/submit"
            },
            {
                name: "Promote a Product",
                description: "Promote a product to our community",
                to: "/products/promote"
            }
        ]
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                name: "Full-Time Jobs",
                description: "Find a full-time jobs in our community",
                to: "/jobs?type=full-time"
            },
            {
                name: "Remote Jobs",
                description: "Find a remote jobs in our community",
                to: "/jobs?type=remote"
            },
            {
                name: "Freelance Jobs",
                description: "Find a freelance jobs in our community",
                to: "/jobs?type=freelance"
            },
            {
                name: "Internships",
                description: "Find a internships in our community",
                to: "/jobs?type=internship"
            }, {
                name: "Post a Job",
                description: "Post a new job to our community",
                to: "/jobs/submit"
            }
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                name: "All Posts",
                description: "See all posts in our community",
                to: "/community"
            },
            {
                name: "Top Posts",
                description: "See the top posts in our community",
                to: "/community?sort=top"
            },
            {
                name: "New Posts",
                description: "See the new posts in our community",
                to: "/community?sort=new"
            },
            {
                name: "Create a Post",
                description: "Create a new post to our community",
                to: "/community/create"
            },


        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideas",

    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                name: "All Teams",
                description: "See all teams in our community",
                to: "/teams"
            },
            {
                name: "Create a Team",
                description: "Create a new team to our community",
                to: "/teams/create"
            },

        ]
    }
]

export function Navigation({ isLoggedIn, hasNotifications, hasMessages, username, name, avatar }:
    { isLoggedIn: boolean, hasNotifications: boolean, hasMessages: boolean, username?: string, name?: string, avatar?: string | null }) {
    return (
        <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
            <div className="flex items-center gap-4">
                <Link to="/" className="font-bold tracking-tighter text-lg">Wemake</Link>
                <Separator orientation="vertical" className="h-6" />
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-1">
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name}>
                                {menu.items ? <>
                                    <Link to={menu.to}>
                                        <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                    </Link>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[600px] gap-3 p-4 grid-cols-2">
                                            {menu.items?.map((item) => (
                                                <NavigationMenuItem key={item.name} className={
                                                    cn(["select-none rounded-md transition-colors focus:bg-accent",
                                                        item.to === "/products/promote" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                                                        item.to === "/jobs/submit" && "bg-accent/50",
                                                    ])}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            className="p-3 space-y-1 block rounded-md hover:bg-accent/50 transition-colors"
                                                            to={item.to}>{item.name}
                                                            <span className="text-sm text-muted-foreground">{item.description}</span>
                                                        </Link>
                                                    </NavigationMenuLink>

                                                </NavigationMenuItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </> : <Link className={navigationMenuTriggerStyle()} to={menu.to}>{menu.name}</Link>}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            {isLoggedIn ?
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" asChild className="relative">
                        <Link to="/my/notifications">
                            <BellIcon className="size-4" />
                            {hasNotifications && <span className="absolute top-0 right-1.5 size-2 rounded-full bg-red-500" />}
                        </Link>
                    </Button>
                    <Button size="icon" variant="ghost" asChild className="relative">
                        <Link to="/my/messages">
                            <MessageCircleIcon className="size-4" />
                            {hasMessages && <span className="absolute top-0 right-1.5 size-2 rounded-full bg-red-500" />}
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                {avatar !== null && <AvatarImage src={avatar} />}
                                {avatar === null && <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>}
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel className="flex flex-col gap-1">
                                <span className="font-medium">{name}</span>
                                <span className="text-xs text-muted-foreground">
                                    @{username}
                                </span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to="/my/dashboard">
                                        <BarChart3Icon className="size-4 mr-2" />
                                        Dashboard </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/my/profile">
                                        <UserIcon className="size-4 mr-2" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/my/settings">
                                        <SettingsIcon className="size-4 mr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/auth/logout">
                                        <LogOutIcon className="size-4 mr-2" />
                                        Logout
                                    </Link>

                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                : <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link to="/auth/join">Sign Up</Link>
                    </Button>
                </div>}
        </nav>
    )
}