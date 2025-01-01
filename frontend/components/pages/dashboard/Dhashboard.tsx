"use client"
import React from 'react'
import { Sportlight } from './components/Sportlight'
import About from './about/About'
import Contact_Us from './contact/Contact_Us'
import { Cards } from './herosection/Cards'
import Footer from './footer/Footer'

function Dhashboard() {

  
  
  return(
    <div>
      <Sportlight/>
      <Cards/>
      <About/>
      <Contact_Us/>
      <Footer/>
    </div>
  )
  
  
}

export default Dhashboard