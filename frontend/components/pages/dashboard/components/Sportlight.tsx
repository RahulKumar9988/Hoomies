"use client";
import React, { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import Button from "@/components/Button";
import Button_Silver from "@/components/Button_Silver"; 
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sportlight() {

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
    }, [router]);

  return (
    <div className="md:h-[30rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Hoomies... <br /> 
        </h1>
        <div className="flex flex-col items-center gap-5">
          <p className="mt-4 font-normal text-neutral-300 max-w-lg text-xl text-center mx-auto">
            "In the halls where knowledge blooms, we chase our dreams in crowded rooms."
          </p>
          {isAuthenticated ? (
          <div className="flex gap-4">
            <Link href="/explore"><Button name="Explore"/></Link>
            <Link href="/upload_image"><Button_Silver name="Upload your place"/></Link>
          </div>
          ) : (
            <div className="flex gap-4">
            <Link href="/explore"><Button name="Explore"/></Link>
            <Link href="/signup"><Button_Silver name="New User"/> </Link>
          </div>
          )}

        </div>
        
      </div>
    </div>
  );
}
