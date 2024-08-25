import Link from 'next/link'
import React from 'react'

const AuthRedirection = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-green-800">
  <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-black shadow-lg">
    <div className="flex flex-col gap-3 text-xl">
      <span className="text-4xl font-semibold text-red-500">Oops!! Looks Like you haven't join us yet...</span>
      <span> To log in please <Link href={`/Sign-In`}><span className="text-blue-600">click Here</span></Link> </span>
      <span>Or if you havn't signed in please sign in first by <Link href={`/Sign-up`}><span className="text-blue-600">clicking here</span></Link></span>
    </div>
  </div>
</div>
  )
}
export default AuthRedirection
