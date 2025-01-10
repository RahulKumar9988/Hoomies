"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaPhone, FaDollarSign, FaRupeeSign } from 'react-icons/fa'

interface ExploreProps {
  content: string
  imageURl: string
  price: string
  title: string
  phone: string
}

const Explore: React.FC<ExploreProps> = ({ content, imageURl, price, title, phone,  }) => {
  const router = useRouter()

  return (
    <div className="group relative flex flex-col bg-neutral-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-96  w-80 max-w-sm mx-auto">
      <div className="relative w-full h-64 sm:h-48 md:h-64">
        {imageURl ? (
          <Image
            src={imageURl}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No image available
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 md:p-6 flex flex-col gap-1.5 sm:gap-2">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-2">
          {content}
        </p>

        <div className="mt-2 sm:mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600">
            <FaRupeeSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold text-sm sm:text-base">{price}</span>
            </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
            <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 transform rotate-90"/>
            <a
              href={`tel:${phone}`}
              className="text-sm sm:text-base hover:text-emerald-600 transition-colors"
            >
              {phone}
            </a>
          </div>

          <button
            onClick={() =>
              router.push(
                `/full_post?title=${encodeURIComponent(title)}&content=${encodeURIComponent(
                  content
                )}&imageURl=${encodeURIComponent(imageURl)}&price=${encodeURIComponent(
                  price
                )}&phone=${encodeURIComponent(phone)}`
              )
            }
            className="border-2 bg-black w-14 h-8 rounded-2xl text-white"
          >
            More
          </button>

        </div>
      </div>
    </div>
  )
}

export default Explore
