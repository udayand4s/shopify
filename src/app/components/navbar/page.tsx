import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'

function Navbar() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Homepage</h1>

      <SignedOut>
        <SignInButton/>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn></div>
  )
}

export default Navbar