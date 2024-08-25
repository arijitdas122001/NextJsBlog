"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Bell, ClipboardPen, LogIn, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const router=useRouter();
  const handelLogOutClick=()=>{
    signOut();
    router.replace('/AuthRedirect')
  }
  return (
    <div className="border border-black">
      <div className="p-2 flex justify-between">
        <div className="flex gap-3 text-black justify-center items-center">
          <div className="text-xl font-bold flex justify-center items-center">
            <Link href={"/"}>BlogPedia</Link>
          </div>
          <div className="hover:cursor-pointer">
            <Search />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="p-1 text-lg">
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black rounded-xl">
                  <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-white">
                    <ListItem href={"/"}>
                      Home
                    </ListItem>
                    <ListItem href={"/blogs/upload"}>
                      Write your own
                    </ListItem>
                    <ListItem href={"/blogs/all-blogs/all"}>
                      Visit all blogs
                    </ListItem>
                    <ListItem href={"/dashboard"}>
                      Dashboard
                    </ListItem>
                    <ListItem href={"/Sign-In"}>
                      Log-In
                    </ListItem>
                    <ListItem href={"/Sign-up"}>
                      Sign-Up
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-8 text-black hover:cursor-pointer p-2 justify-center items-center">
          <div className="flex gap-2 witems-center">
            <Link href={"/blogs/upload"}>
              <ClipboardPen />
              <div>Write</div>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <Bell />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              {session?.user.username?<LogOut onClick={handelLogOutClick}/>:<Link href={'/Sign-In'}><LogIn/></Link>}
            </div>
          </div>
          <div>
            <Link href={`/User/${session?.user.username}`}>
              <Image
                src={`https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1719863122~exp=1719866722~hmac=6902bffb658a27d8a61252b84ef990418210aafc72c5be8542dd03a74d07a2d4&w=740`}
                alt="No_user_image"
                height={50}
                width={50}
                priority={true}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2  text-lg eading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
