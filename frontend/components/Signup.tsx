"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";



export function Signup() {
  const router = useRouter()



  const [user, setuser] = useState({ 
    email: '', 
    username: '', 
    password: '', 
  });

  

  const login_submit = async() =>{
    try{
      const response = await axios.post('http://127.0.0.1:8787/api/v1/users/signup', user);
      console.log(response);
      
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);

      if(response){
        router.push('/')
      }
      
    }catch(err:any){
      alert(`${err.message}`)

    }
  }
  
  return (
    <div className="h-[55vh] md:h-auto mt-20 w-full max-w-[95%] md:max-w-md mx-auto rounded-2xl border border-white p-3 md:p-8 bg-black">
      <h2 className=" mt-5 font-bold text-xl sm:text-2xl text-neutral-200">
      Welcome to Hoomies...
      </h2>
      <p className="text-xs sm:text-sm max-w-sm mt-2 text-neutral-300">
      Login to Hoomies...
      </p>

      <div className="my-4 md:my-8">
      <div className="flex flex-col space-y-2 mb-4">
        <LabelInputContainer>
        <Label htmlFor="username" className="text-sm md:text-base">Username</Label>
        <Input 
          id="lastname" 
          placeholder="Rahul" 
          type="text" 
          className="h-9 md:h-10"
          onChange={(e)=>{
          setuser({...user, username: e.target.value});
          }}
        />
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
        <Input 
        id="email" 
        placeholder="rola@gmail.com" 
        type="email"
        className="h-9 md:h-10"
        onChange={(e)=>{
          setuser({...user, email: e.target.value});
        }}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
        <Input 
        id="password" 
        placeholder="••••••••" 
        type="password"
        className="h-9 md:h-10"
        onChange={(e)=>{
          setuser({...user, password: e.target.value});
        }}
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-9 md:h-10 text-sm md:text-base font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_ shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
        onClick={login_submit}
      >
        Sign in &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-4 md:my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <div className="flex gap-2 justify-center text-xs sm:text-sm md:text-base">
        <p>Already have an account</p>
        <Link className="text-center font-semibold" href="/signin">: Sign In </Link>
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
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};