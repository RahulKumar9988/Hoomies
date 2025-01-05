"use client"
import Explore from '@/components/pages/explore/Explore'
import axios from 'axios'
import React, { useEffect } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'

const ExplorePage: React.FC = () => {
  const [posts, setPosts] = React.useState<any[]>([])  // Ensure posts is always an array
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8787/api/v1/post/bulk', {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });

        // Ensure that 'response.data.post' is an array
        const postsData = Array.isArray(response.data.post) ? response.data.post : [];

        // Log postsData to check the structure
        console.log('Fetched posts data:', postsData);

        setPosts(postsData);

        // Log posts state after setting
        console.log('Updated posts state:', posts);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setPosts([]);  // Reset in case of error
        setLoading(false);  // Stop loading even if there's an error
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <SyncLoader color="#00ff6b" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <header className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-400">
          Featured Places
        </h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Explore
            key={index}
            authorId={post.authorId}  // Ensure post.authorId is present
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
    </div>
  );
}

export default ExplorePage;
