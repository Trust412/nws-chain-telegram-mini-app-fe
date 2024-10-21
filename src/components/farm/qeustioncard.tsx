"use client"
import Image from 'next/image'
import React from 'react'

// interface Props {
//   cardImg: string
// }
export default function QuestionIcon({ cardImg } : { cardImg:string }) {
  return (
    <div className='bg-[url("/image/question.png")] bg-cover border rounded-lg w-16 h-16'>
      { cardImg && <Image className='border rounded-lg w-16 h-16' src={cardImg} alt='' width={64} height={64}/>} 
    </div>
  )
}