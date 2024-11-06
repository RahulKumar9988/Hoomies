import Explore from '@/components/pages/explore/Explore'
import Upload from '@/components/pages/explore/Upload'
import React from 'react'

function page() {
  return (
    <div className='mt-14 p-5'>
      <h1 className='text-5xl mb-10 font-semibold'>Explore</h1>   
      <h2 className='text-4xl font-semibold'>Place</h2>
      <div className=' grid grid-cols-2 md:grid-cols-4 gap-5 '>

        <Explore description='description...' imageSrc='/house/house1.avif' link=''/>

        <Explore  description='description...' imageSrc='/house/house1.avif' link=''/>

        <Explore description="description..." imageSrc='/house/house1.avif' link=''/>

        <Explore description='description...' imageSrc='/house/house1.avif' link=''/>

        <Upload/>
        
      </div>
      
    </div>
  )
}

export default page