"use client";
import Explore from "@/components/pages/explore/Explore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { BACKEND_URL } from "@/next.config";

const ExplorePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 10000 });

  const fetchPosts = async (currentPage: number, order: "latest" | "oldest", range: { min: number; max: number }) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/post/bulk`, {
        params: { page: currentPage, limit: 10, sort: order, minPrice: range.min, maxPrice: range.max },
        headers: { Authorization: localStorage.getItem("token") || "" },
      });

      const postsData = Array.isArray(response.data.posts) ? response.data.posts : [];
      setPosts((prevPosts) => (currentPage === 1 ? postsData : [...prevPosts, ...postsData]));
      setHasMore(postsData.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page, sortOrder, priceRange);
  }, [page, sortOrder, priceRange]);

  const handleSortChange = (order: "latest" | "oldest") => {
    if (sortOrder !== order) {
      setSortOrder(order);
      setPage(1);
      setPosts([]);
    }
  };

  const handlePriceChange = (value: number) => {
    setPriceRange({ min: 1000, max: value });
    setPage(1);
    setPosts([]);
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-300">Featured Places</h2>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => handleSortChange("latest")}
            className={`px-4 py-2 rounded ${sortOrder === "latest" ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-300"}`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortChange("oldest")}
            className={`px-4 py-2 rounded ${sortOrder === "oldest" ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-300"}`}
          >
            Oldest
          </button>
        </div>
      </header>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-300">Filter by Max Price</h3>
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="range"
            min={1000}
            max={10000}
            value={priceRange.max}
            step={500}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-72"
          />
          <span className="text-gray-300">{priceRange.max}</span>
        </div>
      </div>

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
          !loading && <div className="text-gray-300">No posts available</div>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-8">
          <PulseLoader color="#00ff07" />
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={loadMorePosts}
            className="px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
