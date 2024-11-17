"use client"
import React from 'react'

function Button_Silver({name}:{name:string}) {
  return (
    <div>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-3xl border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-100 transition-colors  focus:ring-offset-slate-50 font-semibold">
          {name}
        </button>
    </div>
  )
}

export default Button_Silver