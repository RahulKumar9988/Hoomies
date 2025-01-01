import Explore from '@/components/pages/explore/Explore'
import React from 'react'

const ExplorePage: React.FC = () => {
  const properties = [
    {
      id: 1,
      description: 'Luxurious Modern Home',
      imageSrc: '/house/house1.avif',
      link: '/properties/1'
    },
    {
      id: 2,
      description: 'Cozy Downtown Apartment',
      imageSrc: '/house/house1.avif',
      link: '/properties/2'
    },
    {
      id: 3,
      description: 'Spacious Family House',
      imageSrc: '/house/house1.avif',
      link: '/properties/3'
    },
    {
      id: 4,
      description: 'Modern Studio Apartment',
      imageSrc: '/house/house1.avif',
      link: '/properties/4'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 mt-10 md:mt-0">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 mb-4">
          Explore
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-300">
          Featured Places
        </h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {properties.map((property) => (
          <Explore
            key={property.id}
            description={property.description}
            imageSrc={property.imageSrc}
            link={property.link}
          />
        ))}
      </div>
    </div>
  )
}

export default ExplorePage