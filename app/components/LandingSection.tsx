import React from 'react'

import HorizontalEventCard from './HorizontalEventCard'

const LandingSection = ({title}) => {
  return (
    <div className='flex flex-col gap-4 py-12'>
      <h1 className='text-3xl pb-4 font-bold'>{title}</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
      <HorizontalEventCard event={{title: "hi"}}/>
      <HorizontalEventCard event={{title: "hi"}}/>
      <HorizontalEventCard event={{title: "hi"}}/>
      <HorizontalEventCard event={{title: "hi"}}/>
      <HorizontalEventCard event={{title: "hi"}}/>
      <HorizontalEventCard event={{title: "hi"}}/>
    </div>
    <button className='mx-auto w-96 h-16 border-2 border-black rounded-md'>See More</button>
    </div>
  )
}

export default LandingSection
