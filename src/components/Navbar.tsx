"use client"
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Bell, ClipboardPen,   Search } from "lucide-react";

function Navbar() {
  return (
    <div className="border border-black">
  <div className="flex justify-between">
    <div className="flex gap-3 text-black justify-center align-middle">
      <div className="text-xl font-bold">BlogPedia</div>
      <div>
        <Search/>
      </div>
    </div>
    <div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-1">Components</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black">
            <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <ListItem
                >
                  Upload
                </ListItem>
                <ListItem
                >
                  Write your own
                </ListItem>
                <ListItem
                >
                  Visit Us
                </ListItem>
            </ul>
          </NavigationMenuContent>
          </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    <div className="flex gap-5 text-black justify-center">
      <div className="flex">
        <ClipboardPen height={20}/>
        write
      </div>
      <div>
        <Bell/>
      </div>
      <div>
      <Image src={`https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1719863122~exp=1719866722~hmac=6902bffb658a27d8a61252b84ef990418210aafc72c5be8542dd03a74d07a2d4&w=740`} alt="No_user_image" height={40} width={30} className="rounded-full"/>
      </div>
    </div>
  </div>
</div>

  )
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
  )
})
ListItem.displayName = "ListItem"
export default Navbar