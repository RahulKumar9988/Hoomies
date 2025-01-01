"use client"
import Button_Silver from '@/components/Button_Silver'
import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <div className="">
        <footer className="text-gray-400 bg- body-font border-t-2 border-gray-800">
        <div className="container px-4 lg:px-8 py-12 lg:py-16 mx-auto">
            <div className="flex flex-col md:flex-row justify-between">
                <div className='flex w-full' >
                <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8 lg:mb-0">
                    <h2 className="title-font font-bold text-white tracking-wider text-lg mb-4">COMPANY</h2>
                    <nav className="list-none space-y-3">
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">About Us</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Our Services</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Contact</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Careers</a>
                    </li>
                    </nav>
                </div>

                <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8 lg:mb-0">
                    <h2 className="title-font font-bold text-white tracking-wider text-lg mb-4">RESOURCES</h2>
                    <nav className="list-none space-y-3">
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Documentation</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Blog</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Support</a>
                    </li>
                    <li>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</a>
                    </li>
                    </nav>
                </div>

                </div>
               
                <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-8 lg:mb-0">
                    <h2 className="title-font font-bold text-white tracking-wider text-lg mb-4">NEWSLETTER</h2>
                    <div className="flex flex-col space-y-4">
                        <div className="relative">
                            <label htmlFor="footer-field" className="text-sm text-gray-400 mb-2 block">Stay updated with our latest news</label>
                            <input 
                                type="email" 
                                id="footer-field" 
                                name="footer-field" 
                                placeholder="Enter your email"
                                className="w-60 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <Button_Silver name='Subscribe'/>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800">
            <div className="container px-4 lg:px-8 py-2 md:py-4 mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-1 md:mb-0">
            <Image src="/logo1.png" alt="Your Brand" width={120} height={32} />
            </div>

            <p className="text-sm text-gray-400 text-center md:text-left mb-1 md:mb-0">© {new Date().getFullYear()} Your Brand. All rights reserved.</p>

            <div className="flex space-x-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a key={social} className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                    <span className="sr-only">{social}</span>
                    <svg fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                    {social === 'facebook' && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                    {social === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>}
                    {social === 'instagram' && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z"/>}
                    {social === 'linkedin' && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>}
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