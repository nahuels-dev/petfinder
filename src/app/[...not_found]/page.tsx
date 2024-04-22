import React from 'react'
import NotFoundImage from "../../../public/404.png"
import Image from 'next/image'

function NotFound() {
  return (
    <div className='not-found-page'>
      <Image src={NotFoundImage} alt="not found" />
    </div>
  )
}

export default NotFound
