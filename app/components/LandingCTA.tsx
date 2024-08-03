import React from 'react'
import Image from 'next/image'
import { FaRegCalendarPlus } from "react-icons/fa6";
import CTA from "../assets/images/Create Event CTA.png"

const LandingCTA = () => {
    return (
        <div className='relative'>
            <Image
                src={CTA}
                className="w-full"
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
            />
            <div className='absolute left-20 top-0 h-full w-full flex gap-16 justify-center items-center'>
                <div className='flex flex-col gap-4 text-[#FFE047]'>
                    <h2 className='font-bold text-3xl'>Create an event with EZticks</h2>
                    <p className='text-xl'>Got a show, event, activity or a great experience? Partner with us & get listed on EZticks</p>
                </div>
                <button className='flex gap-4 justify-center items-center w-64 h-14 rounded-md bg-[#FFE047] text-[#2D2C3C] font-semibold text-lg'><FaRegCalendarPlus /><p>Create Event</p></button>
            </div>
        </div>
    )
}

export default LandingCTA
