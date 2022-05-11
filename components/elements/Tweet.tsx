import React, { useEffect } from 'react'
import { Comment, Tweet } from '../../typings'
import moment from 'moment'
import { fetchComments } from './../../utilits/fetchComments'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = React.useState<Comment[]>([])
  const refreshComment = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }
  useEffect(() => {
    refreshComment()
  }, [])

  return (
    <div className="flex flex-col border-y border-gray-100 p-5">
      <div className="flex space-x-1">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="User Profile"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p>{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLocaleLowerCase()}
            </p>
            <p className="text-sm text-gray-500">
              {moment(tweet._createdAt).fromNow()}
            </p>
          </div>
          <p>{tweet.text}</p>
          {tweet.tweetImg && (
            <img
              src={tweet.tweetImg}
              alt="Post Featured"
              className="m-5 ml-0 mb-2 max-h-60 rounded object-cover shadow-lg "
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between text-gray-400">
        <div className="flex cursor-pointer items-center space-x-3">
          <HeartIcon className="h-5 w-5 " />
          <p>20</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3">
          <ChatAlt2Icon className="h-5 w-5 " />
          <p>{comments?.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3">
          <SwitchHorizontalIcon className="h-5 w-5 " />
        </div>

        <div className="flex cursor-pointer items-center space-x-3">
          <UploadIcon className="h-5 w-5 " />
        </div>
      </div>
      {/* Comment Box Logic */}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-200 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-3">
              <hr className="absolute top-10 left-5 h-8 border-x border-twitter/30" />
              <img
                className="mt-2 h-7 w-7 rounded-full object-cover "
                src={comment.profileImg}
                alt="Comment User"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{comment.username.replace(/\s+/g, '').toLocaleLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {moment(comment._createdAt).fromNow()}
                  </p>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
