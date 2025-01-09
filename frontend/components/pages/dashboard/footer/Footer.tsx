"use client"
import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <div className="">
        <footer className="text-gray-400 bg- body-font border-t-2 border-gray-800">
        

        <div className="border-t border-gray-800">
            <div className="container px-4 lg:px-8 py-2 md:py-4 mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-1 md:mb-0">
            <Image src="/logo1.png" alt="Your Brand" width={120} height={32} />
            </div>

            <p className="text-sm text-gray-400 text-center md:text-left mb-1 md:mb-0">"Made by Rahul_Kumar"</p>
                <div className="flex items-center gap-7">
                    <p className=''>Socical</p>
                    {[
                        { name: 'twitter', link: 'https://x.com/Rahul_kr_rahul' },
                        { name: 'linkedin', link: 'https://www.linkedin.com/in/rahul-kumar-320aaa325/' }
                    ].map((social) => (
                    <a 
                        key={social.name} 
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                        <span className="sr-only">{social.name}</span>
                        <svg fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                        {social.name === 'facebook' && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                        {social.name === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>}
                        {social.name === 'instagram' && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z"/>}
                        {social.name === 'linkedin' && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>}
                        </svg>
                    </a>
                    ))}
                </div>
            </div>
        </div>
        </footer>
    </div>
  )
}

export default Footer