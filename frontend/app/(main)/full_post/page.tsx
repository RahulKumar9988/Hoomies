"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

const FullPost = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const imageURl = searchParams.get("imageURl");
  const price = searchParams.get("price");
  const phone = searchParams.get("phone");

  return (
    <div className="mt-20 p-6 mx-auto max-w-2xl bg-neutral-100 rounded-lg shadow-lg ">
      {imageURl && (
        <Image
          src={imageURl}
          alt={title || "Post Image"}
          width={600}
          height={400}
          className="rounded-lg mx-auto"
        />
      )}
      <h1 className="text-2xl font-bold text-gray-800 mt-4">{title}</h1>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-emerald-600 font-semibold flex items-center gap-2">
          <span>${price}</span>
        </div>
        <div className="text-gray-600 flex items-center gap-2">
          <a href={`tel:${phone}`} className="hover:text-emerald-600">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
