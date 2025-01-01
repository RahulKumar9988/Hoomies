import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ExploreProps {
  description: string;
  imageSrc: string;
  link: string;
}

function Explore({ description, imageSrc, link }: ExploreProps) {
  return (
    <div className="w-full">
      <div className="transition-all duration-300 hover:scale-105 border  
                    bg-zinc-900 p-4 rounded-xl flex flex-col h-full ">
        <div className="relative w-full aspect-square mb-4">
          <Image
            src={imageSrc}
            alt={description}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-gray-200 mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
        <Link 
          href={link}
          className="inline-block text-center px-4 py-2 border border-zinc-700 
                   rounded-lg hover:bg-zinc-800 transition-colors duration-200
                   text-zinc-200 hover:text-white"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Explore;
