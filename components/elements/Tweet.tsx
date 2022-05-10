import React from 'react'
import { Tweet } from '../../typings'
import moment from 'moment'
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
              @{tweet.username.replace(/\s+/g, '')}
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
          <p>2</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3">
          <SwitchHorizontalIcon className="h-5 w-5 " />
        </div>

        <div className="flex cursor-pointer items-center space-x-3">
          <UploadIcon className="h-5 w-5 " />
        </div>
      </div>
    </div>
  )
}

export default Tweet
