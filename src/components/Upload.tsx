'use client'
import React from 'react'
import { CldUploadButton } from 'next-cloudinary'
const Upload = () => {
  return (
    <CldUploadButton uploadPreset="<Upload Preset>" className="bg-red-500 text-white p-3 rounded-md"/>
  )
}

export default Upload
