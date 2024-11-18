"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
export function Navbar() {

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500" />,
    },
    {
      name: "Explore",
      link: "/explore",
      icon: <IconUser className="h-4 w-4 text-neutral-500" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500" />
      ),
    }
    
  ];
  return (
    <div className=" right-1 w-96  ">
      <FloatingNav navItems={navItems} />
      <DummyContent />  
    </div>
  );
}
const DummyContent = () => {
  return (
    <div className="w-full">

    </div>
  );
};
