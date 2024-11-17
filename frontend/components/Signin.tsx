"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


export function Signin() {
  const router = useRouter()
  const { data: session } = useSession();


  const [user, setuser] = useState({ 
    email: '', 
    username: '', 
    password: '', 
  });

  useEffect(() => {
    const token = session?.token || localStorage.getItem("token");
    if (token) {
      router.push('/');
    }
  }, [session, router]);

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
    <div className="mt-3 max-w-md w-full mx-auto rounded-none md:rounded-2xl border border-white p-4 md:p-8  bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Hoomies...
      </h2>
      <p className=" text-sm max-w-sm mt-2 text-neutral-300">
        Login to Hoomies...
      </p>

      <div className="my-8" >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input id="lastname" placeholder="Rahul" type="text" onChange={(e)=>{
              setuser({...user, username: e.target.value});
            }}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="rola@gmail.com" type="email" onChange={(e)=>{
            setuser({...user, email: e.target.value});
          }}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e)=>{
            setuser({...user, password: e.target.value});
          }} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn  from-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_ shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" onClick={login_submit}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          
          <button onClick={()=>{
            signIn('google')
          }}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          
          <div className="flex gap-2 justify-center">
            <p>Already have an account</p>
            <Link className="text-center font-semibold" href="/signup">: Signup </Link>
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
