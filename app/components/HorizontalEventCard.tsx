import React from 'react'
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'



const HorizonEventCard = ({ event }) => {

    function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      
        const monthIndex = date.getMonth();
        const day = date.getDate();
      
        const info = {day, month: monthNames[monthIndex]};
      
        return info;
      }

      function formatTimeRange(inputDate, durationHours) {
        const startDate = new Date(inputDate);
      
        const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
      
        const startHour = startDate.getHours();
        const startMinute = startDate.getMinutes();
        const startPeriod = startHour >= 12 ? 'PM' : 'AM';
        const formattedStart = formatTime(startHour, startMinute) + ' ' + startPeriod;
      
        const endHour = endDate.getHours();
        const endMinute = endDate.getMinutes();
        const endPeriod = endHour >= 12 ? 'PM' : 'AM';
        const formattedEnd = formatTime(endHour, endMinute) + ' ' + endPeriod;
      
        const timeRange = `${formattedStart} - ${formattedEnd}`;
      
        return timeRange;
      }
      
      function formatTime(hours, minutes) {
        return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
      }  

    const router = useRouter()
    return (
        <div onClick={() => router.push('event?id='+event.id)} className='px-12 rounded gap-4 flex flex-col h-96'>
            <img
                src={event.pic}
                className={"object-cover w-full h-[50%] rounded-t-md"}
                alt="Hero Illustration"
                loading="eager"
            />
            <div className='flex px-4 gap-6 items-center'>
                <div className='flex flex-col items-center text-center gap-2'>
                    <p className='text-[#4539B4] text-2xl'>{formatDate(event.datetime).month}</p>
                    <p className=' text-2xl font-semibold'>{formatDate(event.datetime).day}</p>
                </div>
                <div className='flex flex-col gap-2'>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className='text-md text-gray-500 font-bold'>{event.location}</p>
                <p className='text-md text-gray-500'>{formatTimeRange(event.datetime, event.duration)}</p>
                <div className='flex gap-1 items-center text-green-700'>
                    <IoTicketSharp />
                    <p>{event.ticketprice}DT</p>
                </div>
            </div>
            </div>

        </div>
    )
}

export default HorizonEventCard