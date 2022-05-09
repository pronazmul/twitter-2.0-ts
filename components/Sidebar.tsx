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

function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col px-4 items-center md:items-start">
      <img className="h-10 w-10 m-3" src="images/twitter-logo.png" alt="Logo" />
      <SidebarRaw Icon={HomeIcon} title="Home" />
      <SidebarRaw Icon={HashtagIcon} title="Explore" />
      <SidebarRaw Icon={BellIcon} title="Notifications" />
      <SidebarRaw Icon={MailIcon} title="Messages" />
      <SidebarRaw Icon={BookmarkAltIcon} title="Bookmarks" />
      <SidebarRaw Icon={CollectionIcon} title="Lists" />
      <SidebarRaw Icon={UserIcon} title="Sign In" />
      <SidebarRaw Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar
