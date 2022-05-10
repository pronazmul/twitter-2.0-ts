import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'
import TweetBox from './elements/TweetBox'
import { Tweet } from './../typings.d'
import TweetComponent from './elements/Tweet'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets }: Props) => {
  return (
    <div className="col-span-7 border-x lg:col-span-5">
      {/* Home & Reaload Header */}
      <div className="mt-5 flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Home</h1>
        <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter transition-all duration-1000 hover:rotate-180 active:scale-125" />
      </div>
      {/* Tweet Box */}
      <div>
        <TweetBox />
      </div>
      {/* Tweet */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
