"use client"
import React from 'react'

function About() {
  return (
    <div className='p-14 h-[80vh] md:mt-20'>
        <h1 className='text-center text-5xl  text-neutral-300 md:text-7xl font-bold'>About Us</h1>
        <div className='flex flex-col justify-center gap-5 md:pl-10 md:flex-row mt-10 md:mt-20'>
            <div className=' md:w-[50%] '>
                <p className=' text-3xl md:text-5xl font-semibold'>Welcome to <span className='text-4xl md:text-6xl'>H</span>oomies..</p>
                <p className='text-xl md:text-2xl mt-5 md:mt-10'>Your trusted partner to help you find the perfect rental. We make renting easy, affordable, and hassle-free with a seamless experience tailored to meet your needs.</p>
            </div>
            <div className='md:w-[50%] flex flex-col md:items-center'>
                <p className='text-3xl md:text-5xl font-semibold mb-5 md:mb-10'>Why Us...</p>
                <ul className='text-2xl'>
                    <li>* Short-term rentals</li>
                    <li>* Long-term rentals</li>
                    <li>* 24/7 customer service</li>
                    <li>* Easy booking & Flexible Plans</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default About