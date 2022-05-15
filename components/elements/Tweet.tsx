import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { Comment, Tweet, CommentBody } from '../../typings'
import moment from 'moment'
import { fetchComments } from './../../utilits/fetchComments'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const { data: session } = useSession()
  const [comments, setComments] = React.useState<Comment[]>([])
  const refreshComment = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }
  useEffect(() => {
    refreshComment()
  }, [])

  const [commentBoxOpen, setCommentBoxOpen] = React.useState<boolean>(false)
  const [commentInput, setCommentInput] = React.useState<string>('')

  // Post Commment
  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: commentInput,
      username: session?.user?.name || 'Anonymous User',
      profileImg:
        session?.user?.image ||
        'https://pbs.twimg.com/profile_images/1321514249525489664/ihfZ-RyO_bigger.jpg',
      tweetId: tweet._id,
    }

    const result = await fetch('/api/addComments', {
      method: 'POST',
      body: JSON.stringify(commentInfo),
    })

    const json = await result.json()
    refreshComment()
    toast(`${commentInfo.username} commented ${commentInfo.comment}`, {
      position: 'bottom-left',
    })
    return json
  }
  const handleComment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    postComment()

    // Reset Form:
    setCommentInput('')
    setCommentBoxOpen(false)
  }

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
          <p>0</p>
        </div>
        <div
          onClick={() => setCommentBoxOpen(!commentBoxOpen)}
          className="flex cursor-pointer items-center space-x-3"
        >
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
      {session && commentBoxOpen && (
        <form className="mt-4 flex space-x-1">
          <input
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 rounded bg-gray-100 p-3 outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button
            disabled={!commentInput}
            onClick={handleComment}
            className="duration-70 rounded px-3 text-twitter transition hover:bg-twitter hover:text-white disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}
      {/* View Comemnt */}
      {session && comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-200 p-5 scrollbar-hide">
          {comments.map((comment, index) => (
            <div key={comment._id} className="relative flex space-x-3">
              {comments.length != index + 1 ? (
                <hr className="absolute top-10 left-6 h-8 border-x border-twitter/30" />
              ) : (
                <hr />
              )}
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
