import React from 'react'
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";



const HorizonEventCard = ({ event }) => {
    return (
        <div className='px-12 rounded gap-4 flex flex-col h-96'>
            <img
                src={event.pic}
                className={"object-cover w-full h-[50%] rounded-t-md"}
                alt="Hero Illustration"
                loading="eager"
            />
            <div className='flex px-4 gap-6 items-center'>
                <div className='flex flex-col items-center text-center gap-2'>
                    <p className='text-[#4539B4] text-2xl'>Nov</p>
                    <p className=' text-2xl font-semibold'>25 - 26</p>
                </div>
                <div className='flex flex-col gap-2'>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className='text-md text-gray-500 font-bold'>Ariana, Tunisia</p>
                <p className='text-md text-gray-500'>10:30 AM - 1:30 PM</p>
                <div className='flex gap-1 items-center text-green-700'>
                    <IoTicketSharp />
                    <p>20DT</p>
                </div>
            </div>
            </div>

        </div>
    )
}

export default HorizonEventCard