"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for token immediately on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check localStorage for token
    if (token) {
      setIsAuthenticated(true); // If token exists, set authenticated state to true
    } else {
      setIsAuthenticated(false); // If no token, set to false
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsAuthenticated(false); // Update the state to reflect the logout
    router.push("/"); // Redirect to home or login page after logout
    window.location.reload(); 
    
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className={cn(
          "flex max-w-[60%] md:max-w-fit fixed top-2 inset-x-0 mx-auto border border-transparent rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-evenly space-x-4 border-white",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-500 font-semibold"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {isAuthenticated ? (
          <button
            onClick={handleLogout} // Handle logout action
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full"
          >
            <span>Logout</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        ) : (
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full">
            <Link href="/signin">
              <span>Login</span>
            </Link>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
