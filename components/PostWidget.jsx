import React, { useState, useEffect } from 'react'
import { getRecentPosts, getRelatedPosts } from '../services'
import moment from 'moment'
import Link from 'next/link'

const PostWidget = ({ categories, slug }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) => setPosts(result))
    } else {
      getRecentPosts().then((result) => setPosts(result))
    }
  }, [slug])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        { slug ? "Related Posts" : "Recent Posts" }
      </h3>
      {posts.map((post, index) => {
        return (
          <div key={index} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <img 
                src={post.featuredImage.url}
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-md"
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`} className="text-md" key={index}>
                {post.title}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostWidget