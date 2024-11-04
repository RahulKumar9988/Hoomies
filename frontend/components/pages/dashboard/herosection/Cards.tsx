"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";

export function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-4">
      <div className="h-[30rem] w-full flex items-center justify-center ">
      <PinContainer
        title="bala jii ground"
        href="/"
      >
        <div className=" flex basis-full flex-col p-0 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-xl text-slate-100">
            Balajii Ground
          </h3>
          <div>
            <img className="h-[50vh] rounded-lg" src="/2.jpg" alt="" />
          </div>
        </div>
      </PinContainer>
      </div>

      <div className="h-[30rem] w-full flex items-center justify-center ">
      <PinContainer
        title="Collage 3rd gate"
        href="/"
      >
        <div className=" flex basis-full flex-col p-0 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-xl text-slate-100">
            College 3rd Gate
          </h3>
          <div>
            <img className="h-[50vh] w-full rounded-lg" src="/3.jpg" alt="" />
          </div>
          
        </div>
      </PinContainer>
      </div>

      <div className="h-[30rem] w-full flex items-center justify-center ">
        <PinContainer 
          title="College 3rd gate"
          href="/"
        >
          <div className=" flex basis-full flex-col p-0 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-xl text-slate-100">
              College 3rd Gate
            </h3>
            <div>
              <img className="h-[50vh] rounded-lg" src="/4.jpg" alt="" />
            </div>
            
          </div>
        </PinContainer>
      </div>
      
      <div className="h-[30rem] w-full flex items-center justify-center ">
        <PinContainer
          title="Chati Block 1014"
          href="/"
        >
          <div className=" flex basis-full flex-col p-0 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-xl text-slate-100">
              Chaiti Block 1014
            </h3>
            <div>
              <img className="h-[50vh] w-full rounded-lg" src="/5.jpg" alt="" />
            </div>
            
          </div>
        </PinContainer>
      </div>
    </div>
    
  );
}
