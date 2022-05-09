import React from 'react'
import {
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  CalendarIcon,
} from '@heroicons/react/outline'

const TweetBox = () => {
  return (
    <div className="bg-yellow-300">
      <img
        className="h-14 w-14 rounded-full object-fill "
        src="images/avatar-men.jpg"
        alt="tweet box icon"
      />

      <div>
        <form>
          <input
            className="bg-transparent"
            type="text"
            placeholder="What's happning?"
          />
          <div className='flex'>
            <div className='flex'>
                <PhotographIcon className="h-5 w-5" />
                <SearchCircleIcon className="h-5 w-5" />
                <EmojiHappyIcon className="h-5 w-5" />
                <CalendarIcon className="h-5 w-5" />
                <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button>Tweet</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
