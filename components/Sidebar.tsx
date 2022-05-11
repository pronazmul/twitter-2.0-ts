import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkAltIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRaw from './elements/SidebarRaw'
import { useSession, signIn, signOut } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img className="m-3 h-10 w-10" src="images/twitter-logo.png" alt="Logo" />
      <SidebarRaw Icon={HomeIcon} title="Home" />
      <SidebarRaw Icon={HashtagIcon} title="Explore" />
      <SidebarRaw Icon={BellIcon} title="Notifications" />
      <SidebarRaw Icon={MailIcon} title="Messages" />
      <SidebarRaw Icon={BookmarkAltIcon} title="Bookmarks" />
      <SidebarRaw Icon={CollectionIcon} title="Lists" />
      <SidebarRaw onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign out' : 'Sign in'} />
      <SidebarRaw Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar
