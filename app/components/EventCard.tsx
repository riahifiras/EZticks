"use client"
import React from 'react'
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'


function formatDate(inputDate) {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Define an array of month names in three-letter abbreviation format
  const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get the month index and day from the Date object
  const monthIndex = date.getMonth();
  const day = date.getDate();

  // Format the output as "month day"
  const formattedDate = `${monthNames[monthIndex]} ${day}`;

  return formattedDate;
}

function formatTimeRange(inputDate, durationHours) {
  // Create a new Date object from the input date string
  const startDate = new Date(inputDate);

  // Calculate end time by adding duration hours to start time
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  // Format start time
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const startPeriod = startHour >= 12 ? 'PM' : 'AM';
  const formattedStart = formatTime(startHour, startMinute) + ' ' + startPeriod;

  // Format end time
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();
  const endPeriod = endHour >= 12 ? 'PM' : 'AM';
  const formattedEnd = formatTime(endHour, endMinute) + ' ' + endPeriod;

  // Construct the time range string
  const timeRange = `${formattedStart} - ${formattedEnd}`;

  return timeRange;
}

// Helper function to format hours and minutes
function formatTime(hours, minutes) {
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
}

const EventCard = ({event}) => {
  console.log(event);
  
  const router = useRouter()
  return (
    <div onClick={() => router.push('/dashboard/event?id='+event.id)} className='p-4 rounded gap-4 flex h-64'>
        <img
              src={event.pic}
              className={"object-cover w-[50%] h-[90%] rounded-md"}
              alt="event"
            />
        <div className='flex flex-col gap-2'>
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className='text-md text-gray-500 font-bold'>{formatDate(event.datetime)} | {event.location}, Tunisia</p>
        <p className='text-md text-gray-500'>{formatTimeRange(event.datetime, event.duration)}</p>
        <div className='flex gap-1 items-center text-green-700'>
          <IoTicketSharp/>
          <p>{event.ticketprice}DT</p>
        </div>
        </div>
        
    </div>
  )
}

export default EventCard