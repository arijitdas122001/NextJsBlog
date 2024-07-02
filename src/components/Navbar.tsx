"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
function Navbar({ className }: { className?: string }) {
  const [active,setactive]=useState<string | null>(null)
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setactive}>
        <MenuItem setActive={setactive} active={active} item="Our Courses">
          <div className="flex flex-col text-sm space-y-4">
          <HoveredLink href="/courses">Blogs</HoveredLink>
            <HoveredLink href="/courses">
              Explore
            </HoveredLink>
            <HoveredLink href="/courses">
              Upload
            </HoveredLink>
            </div>
        </MenuItem>
        <Link href={"/contact"}>
            <MenuItem setActive={setactive} active={active} item="Authentication">
            <div className="flex flex-col text-sm space-y-4">
          <HoveredLink href="/courses">Sign-Up</HoveredLink>
            <HoveredLink href="/courses">
              Sign-In
            </HoveredLink>
            </div>
            </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default Navbar