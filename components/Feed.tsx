import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'
import TweetBox from './elements/TweetBox'
import { Tweet } from './../typings.d'

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
      <div></div>
    </div>
  )
}

export default Feed
