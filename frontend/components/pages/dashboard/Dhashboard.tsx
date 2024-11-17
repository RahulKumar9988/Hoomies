"use client"
import React from 'react'
import { Sportlight } from './components/Sportlight'
import About from './about/About'
import Contact_Us from './contact/Contact_Us'
import { Cards } from './herosection/Cards'
import Footer from './footer/Footer'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/Navbar'

function Dhashboard() {
  const { data: session } = useSession();
  
  
  return(
    <div>
      {session ? (
         <Navbar />

      ):(
         <Navbar />
        
      )}
      <Sportlight/>
      <Cards/>
      <About/>
      <Contact_Us/>
      <Footer/>
    </div>
  )
  
  
}

export default Dhashboard