import React, { Dispatch, SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import {
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../../typings'
import { fetchTweets } from '../../utilits/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  //Login Data
  const { data: session } = useSession()

  // Input Field to enter tweet
  const [input, setInput] = React.useState<string>('')
  const [image, setImage] = React.useState<string>('')

  //Handle Image Link
  const [imageOpen, setImageOpen] = React.useState<boolean>(false)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const handleImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (imageRef.current?.value) {
      setImage(imageRef.current.value)
      imageRef.current.value = ''
      setImageOpen(false)
    } else {
      return
    }
  }

  // Handle Tweet Mutation:
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Anonymous User',
      profileImg:
        session?.user?.image ||
        'https://pbs.twimg.com/profile_images/1321514249525489664/ihfZ-RyO_bigger.jpg',
      tweetImg: image,
    }
    const result = await fetch(`/api/addTweets`, {
      method: 'POST',
      body: JSON.stringify(tweetInfo),
    })
    const json = await result.json()
    const tweets = await fetchTweets()
    setTweets(tweets)
    toast('Tweet Posted !!')

    return json
  }

  const handleTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()

    setInput('')
    setImage('')
    setImageOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-5 h-14 w-14 rounded-full object-cover"
        src={
          session?.user?.image ? session.user.image : 'images/avatar-men.jpg'
        }
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
              <PhotographIcon
                onClick={() => setImageOpen(!imageOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-200 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleTweet}
              disabled={!session || !input}
              className="cursor-pointer rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-50"
            >
              Tweet
            </button>
          </div>
          {/* Add Tweet Image Link */}
          {imageOpen && (
            <form className="mt-3 flex rounded bg-twitter/60 px-3 py-2">
              <input
                ref={imageRef}
                className="flex-1 bg-transparent outline-none"
                type="text"
                placeholder="Enter Image Link"
              />
              <button
                onClick={(e) => handleImage(e)}
                className="text-md font-bold text-white"
              >
                Add Link
              </button>
            </form>
          )}

          {/* View Tweet Image */}
          {image && (
            <img
              src={image}
              alt="tweet image"
              className="mt-10 h-40 w-full rounded object-contain shadow "
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
