"use client"
import React from 'react'

function Contact_Us() {
return (
    <div className='container mx-auto px-4 min-h-screen py-8 md:py-12'>
        <h1 className='text-center text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 text-neutral-300'>
            Contact Us
        </h1>
        <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-8 md:gap-12'>
            <div className='w-full lg:w-1/2 space-y-8 md:space-y-12'>
                <div className=' p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-4'>
                        Developer Team
                    </h2>
                    <ul className='space-y-3 text-lg md:text-xl text-gray-200'>
                        <li className='hover:text-gray-400 transition-colors'>Rahul Kumar</li>
                        <li className='hover:text-gray-400 transition-colors'>Arohi Raj</li>
                        <li className='hover:text-gray-400 transition-colors'>
                            <a href="mailto:developerhomies@gmail.com" className='hover:underline'>
                                developerhomies@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className=' p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-4'>
                        Support Team
                    </h2>
                    <ul className='space-y-3 text-lg md:text-xl text-gray-200'>
                        <li className='hover:text-gray-400 transition-colors'>Harsh Anand</li>
                        <li className='hover:text-gray-400 transition-colors'>Harshita Raj</li>
                        <li className='hover:text-gray-400 transition-colors'>
                            <a href="mailto:supporthomies@gmail.com" className='hover:underline'>
                                supporthomies@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='w-full lg:w-1/2 flex justify-center '>
                <img 
                    className='rounded-full w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover shadow-lg ' 
                    src="/contactus.jpg" 
                    alt="Contact Us"
                />
            </div>
        </div>
    </div>
)
}

export default Contact_Us