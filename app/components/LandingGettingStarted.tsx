import React from 'react'
import Image from 'next/image'
import { FaArrowRight } from "react-icons/fa6";
import GetStarted from "../assets/images/Personalized Recommendations.png"

const LandingGettingStarted = () => {
  return (
    <div className='relative'>
                  <Image
                src={GetStarted}
                className=" w-full"
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
            />
            <div className='absolute top-0 h-full w-full flex flex-col gap-6 justify-center items-center'>
                <div className='flex flex-col gap-4 text-[#2D2C3C]'>
                <h2 className='font-bold text-3xl'>Events specially curated for you</h2>
                <p className='text-xl'>Get event suggestions tailored to your interests! Don't let your favorite events slip away.</p>
                </div>
                <button className='flex gap-4 justify-center items-center w-40 h-14 rounded-md bg-[#2D2C3C] text-[#FFE047] font-semibold text-lg'><p>Get started </p><FaArrowRight/></button>
            </div>
    </div>
  )
}

export default LandingGettingStarted
