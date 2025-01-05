"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const PostDetails = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authorId = searchParams.get('authorId')
  const [post, setPost] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (authorId) {
      // Fetch post details using the ID
      fetch(`http://127.0.0.1:8787/api/v1/post/${authorId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching post:', err)
          setLoading(false)
        })
    }
  }, [authorId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Author ID: {authorId}</p>
    </div>
  )
}

export default PostDetails
