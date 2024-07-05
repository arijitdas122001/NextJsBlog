import React from 'react'

const DashBoard = () => {
  return (
<div className="flex justify-center min-h-screen">
<div className="w-full max-w-5xl space-y-8 bg-purple-800 flex gap-8">
  <div className="flex-2 p-2">
  <div className="bg-pink-200">
    <div className="p-7">
      <div className="flex gap-8 w-full">
        <div className="flex-1 flex flex-col gap-3">
          <div>User1</div>
          <div>You don’t actually NEED if statements (ever)</div>
          <div>Frontend dev will never be the same with the new tag…</div>
        </div>
        <div className="bg-black">Image</div>
      </div>
      <div>LIke</div>
    </div>
  </div>
  </div>
  <div className="flex-1">
  <div className="bg-slate-400">
    <div className='topicks'>
      <div></div>
      <div></div>
    </div>
    <div className='tags'>
      <div></div>
      <div></div>
    </div>
  </div>
  </div>
  </div>
  </div>
  )
}

export default DashBoard
