"use client"
import React from 'react'

function Contact_Us() {
  return (
    <div className='p-2 h-[80vh] '>
        <h1 className='text-center md:text-7xl text-5xl font-bold'>Contact Us</h1>
        <div className='flex flex-col-reverse md:flex-row justify-evenly items-center mt-5 md:mt-20'>
            <div className='flex flex-col md:flex-col  gap-10'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-3xl md:text-4xl font-semibold'>Developer Team</h1>
                    <ul className='text-xl font-semibold'>
                        <li>Rahul Kumar</li>
                        <li>Sonal Mandal</li>
                        <li>@ developerhomies@gmail.com</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-3xl md:text-4xl font-semibold'>Support Team</h1>
                    <ul className='text-xl font-semibold'>
                        <li>Raman Kumar</li>
                        <li>Rajan Mandal</li>
                        <li>@ supporthomies@gmail.com</li>
                    </ul>

                </div>
            </div>
            <img className='rounded-full h-52 md:h-96 mb-5' src="/contactus.jpg" alt="" />
        </div>
        
    </div>
  )
}

export default Contact_Us