import React from 'react'
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";

const EventCard = ({event}) => {
  return (
    <div className='p-4 rounded gap-4 flex h-64'>
        <Image
              src={party}
              className={"object-cover w-[50%] h-[90%] rounded-md"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
        <div className='flex flex-col gap-2'>
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className='text-md text-gray-500 font-bold'>Dec 16 | Ariana, Tunisia</p>
        <p className='text-md text-gray-500'>10:30 AM - 1:30 PM</p>
        <div className='flex gap-1 items-center text-green-700'>
          <IoTicketSharp/>
          <p>20DT</p>
        </div>
        </div>
        
    </div>
  )
}

export default EventCard