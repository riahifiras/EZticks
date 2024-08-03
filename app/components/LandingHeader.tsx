import React from 'react'
import SearchBar from './SearchBar'
import partyImage from '../assets/images/party.jpg'
import Image from 'next/image';

const LandingHeader = () => {
  return (
    <div className='relative flex flex-col items-center gap-12 bg-[#2B293D] py-24 h-96'>
        <Image
                src={partyImage}
                className={"absolute object-cover w-full rounded-t-md top-0 h-full opacity-60"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
            />
      <div className='z-10'>
      <p className='text-3xl font-bold text-strat text-white'>Don’t miss out!</p>
      <p className='text-3xl font-bold text-strat text-white'>Explore the <span className='text-[#FFE047]'>vibrant events</span> happening locally and globally.</p>
      </div>
      <div className='relative w-[80%] max-w-[800px] flex'>
        <input className='w-full outline-none px-6 py-4 text-xl rounded-l-md' type="text" placeholder='Search Events, Categories, Location,...' />
        <SearchBar/>
      </div>
    </div>
  )
}

export default LandingHeader
