import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'

const Comments = ({ comments }) => {
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    setCommentList(comments)
  }, [])
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="w-full font-bold text-lg pb-6 border-b">
        {commentList && commentList.length > 1 ? `${commentList.length} comments` : `${commentList.length} comment`} 
      </h3>
      {commentList.map((comment, index) => {
        return (
          <div className="flex flex-col w-full mt-4 py-4 border-b" key={index}>
            <span><b>{comment.name}</b> on {moment(comment.createdAt).format("MMM DD, YYYY")}</span>
            <p className="mt-4">{comment.comment}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Comments