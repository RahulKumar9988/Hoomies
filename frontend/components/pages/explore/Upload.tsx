"use client"

import React, { useState } from 'react'

function Upload() {
  const [upload, setupload] = useState(null);
  
  const Upload_Handler = (e:any) =>{
    e.preventDefault();
    console.log({upload});

  }

  const handle_file = async(e:any) => {
    console.log('file handling');
    setupload(e.target.files[0])
    
  }

  return (
    <div>
      <form onSubmit={Upload_Handler}>
        <input onChange={handle_file} type="file" accept="image/*"/>
        <button type='submit'>upload</button>
      </form>
    </div>
  )
}

export default Upload