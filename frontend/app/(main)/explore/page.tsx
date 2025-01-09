"use client";
import Explore from "@/components/pages/explore/Explore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { BACKEND_URL } from "@/next.config";

const ExplorePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/post/bulk`, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });

        // Ensure the response structure is valid
        const postsData = Array.isArray(response.data.post) ? response.data.post : [];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PulseLoader color="#00ff07" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <header className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-300">Featured Places</h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Explore
              key={index}
              content={post.content}
              imageURl={post.imageURl}
              price={post.price}
              title={post.title}
              phone={post.phone}
            />
          ))
        ) : (
          <div className="text-gray-300">No posts available</div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
