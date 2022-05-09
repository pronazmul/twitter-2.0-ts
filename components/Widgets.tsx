import { SearchIcon } from '@heroicons/react/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import React from 'react'

const Widgets = () => {
  return (
    <div className=" col-span-2 mt-2 hidden px-2 lg:inline">
      {/* Search Box */}
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3 ">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      {/* Twitter Profile Embed Plugin */}
      <TwitterTimelineEmbed
          sourceType="profile"
          screenName="pronazmul"
          options={{ height: 1000 }}
        />
    </div>
  )
}

export default Widgets
