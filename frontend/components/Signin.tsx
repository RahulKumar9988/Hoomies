"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export function Signin() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/users/signin",
        user
      );

      if (response.status === 200) {
        const jwt = response.data.jwt;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", jwt);
        }

        router.push("/"); // Redirect on success
      }
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/"); // Redirect if token exists
      }
    }
  }, [router]);

  return (
    <div className="mt-24 sm:mt-8 md:mt-24 h-[50vh] md:h-[80vh] w-full max-w-[90%] sm:max-w-md mx-auto rounded-lg md:rounded-2xl border border-white p-4 md:p-8 bg-black ">
      <h2 className="mt-9 font-bold text-lg sm:text-xl text-neutral-200">Welcome to Hoomies...</h2>
      <p className="text-xs sm:text-sm max-w-sm mt-2 text-neutral-300">Login to Hoomies...</p>

      <div className="my-4 sm:my-8">
      <LabelInputContainer className="mb-3 sm:mb-4">
        <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
        <Input
        id="email"
        placeholder="rahul@gmail.com"
        type="email"
        className="text-sm sm:text-base p-2 sm:p-3"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </LabelInputContainer>

      <LabelInputContainer className="mb-3 sm:mb-4">
        <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
        <div className="relative">
          <Input
        id="password"
        placeholder="••••••••"
        type={showPassword ? "text" : "password"}
        className="text-sm sm:text-base p-2 sm:p-3"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={() => setShowPassword(!showPassword)}
          >
        {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-8 sm:h-10 text-sm sm:text-base font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
        type="submit"
        onClick={loginSubmit}
      >
        Sign In &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-4 sm:my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex gap-2 justify-center text-xs sm:text-sm">
        <p>Don't have an account?</p>
        <Link className="text-center font-semibold" href="/signup">
          Sign up
        </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
  );
};
