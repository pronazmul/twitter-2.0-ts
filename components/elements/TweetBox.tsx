import React from 'react'
import {
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  CalendarIcon,
} from '@heroicons/react/outline'

const TweetBox = () => {
  const [input, setInput] = React.useState<string>('')

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-5 h-14 w-14 rounded-full object-fill "
        src="images/avatar-men.jpg"
        alt="tweet box icon"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 bg-transparent text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's happning?"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-200 ease-out hover:scale-150" />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input}
              className="cursor-pointer rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-50"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
