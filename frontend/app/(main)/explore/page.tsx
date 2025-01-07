"use client"
import Explore from '@/components/pages/explore/Explore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'

const ExplorePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);  // Ensure posts is always an array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(1);    // Total pages returned by the API

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current page as a query parameter
        const response = await axios.get('http://127.0.0.1:8787/api/v1/post/bulk', {
          params: {
            page: currentPage,  // Send the current page to the API
          },
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });

        // Ensure that 'response.data.post' is an array
        const postsData = Array.isArray(response.data.post) ? response.data.post : [];

        // Log postsData to check the structure
        console.log('Fetched posts data:', postsData);

        // Assuming the API might also return totalPages, set it if available
        setPosts(postsData);
        setTotalPages(response.data.totalPages || 1);  // Update totalPages if it's available

        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);  // Reset in case of error
        setLoading(false);  // Stop loading even if there's an error
      }
    };
    fetchData();
  }, [currentPage]);  // Re-fetch data when the current page changes

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <SyncLoader color="#00ff6b" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <header className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-300">
          Featured Places
        </h2>
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
          <div>No posts available</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 items-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-100 text-gray-900 rounded-3xl mr-4"
        >
          	<p>&lArr;</p> 
        </button>
        <span className="text-gray-200">
           {currentPage} / {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 text-gray-900 rounded-3xl ml-4"
        >
          <p>&rArr;</p>
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;
