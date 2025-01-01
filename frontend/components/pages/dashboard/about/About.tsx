"use client"
import React from 'react'

function About() {
    return (
        <div className='min-h-96 md:min-h-80 m-5 sm:px-6 lg:px-8 text-neutral-300 '>
            <h1 className='text-center text-[2.5rem] sm:text-5xl md:text-7xl font-bold'>
                About Us
            </h1>
            <div className='flex flex-col justify-center gap-5 mt-6 sm:mt-8 md:mt-20 lg:gap-10 md:flex-row'>
                <div className='w-full md:w-1/2 space-y-4 md:pl-10 '>
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold '>
                        Welcome to <span className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>H</span>oomies..
                    </p>
                    <p className='text-lg sm:text-lg md:text-xl'>
                        Your trusted partner to help you find the perfect rental. We make renting easy, affordable, and hassle-free with a seamless experience tailored to meet your needs.
                    </p>
                </div>
                <div className='w-full md:w-1/2 mt-8 md:mt-0 space-y-4 md:pl-40'>
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
                        Why Us...
                    </p>
                    <ul className='text-lg sm:text-xl md:text-xl space-y-3 '>
                        <li className='flex items-center'>
                            <span className='mr-2'>•</span> Short-term rentals
                        </li>
                        <li className='flex items-center'>
                            <span className='mr-2'>•</span> Long-term rentals
                        </li>
                        <li className='flex items-center'>
                            <span className='mr-2'>•</span> 24/7 customer service
                        </li>
                        <li className='flex items-center'>
                            <span className='mr-2'>•</span> Easy booking & Flexible Plans
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About