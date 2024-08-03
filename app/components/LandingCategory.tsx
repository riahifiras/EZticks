import React from 'react'
import Image from 'next/image'


const LandingCategory = ({categoryImage, categoryName}) => {
  return (
    <div className='flex flex-col gap-6 items-center text-center w-40'>
      <Image
                src={categoryImage}
                className={"object-cover rounded-full h-36 w-36"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
            />
            <h2>{categoryName}</h2>
    </div>
  )
}

export default LandingCategory
