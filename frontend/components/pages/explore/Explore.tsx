import React from 'react';
import Image from 'next/image'; 

interface ExploreProps {
  description: string;
  imageSrc: string; // Renamed to imageSrc
  link: string;
}

function Explore({  description, imageSrc, link }: ExploreProps) {
  return (
    <>
      <div>
        <div className='border h-80 bg-zinc-900 p-5 rounded-xl '>
          <Image src={imageSrc} alt="image" width={300} height={300} />
          <p>{description}</p>

          <a href={link}>Learn More</a>
        </div>
      </div>
    </>
  );
}

export default Explore;
