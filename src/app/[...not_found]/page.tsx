import React from 'react'
import NotFoundImage from "@/assets/images/404.jpg"
import Image from 'next/image'

function NotFound() {
  return (
    <div className='not-found-page'>
      <Image src={NotFoundImage} alt="not found" />
    </div>
  )
}

export default NotFound
