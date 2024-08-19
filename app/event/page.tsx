
"use client"
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import EventSlider from '../components/EventSlider';
import TicketPopup from '../components/TicketPopup';
import { useSearchParams } from 'next/navigation';
import Nav from '../components/Nav';
import Link from 'next/link';

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

function formatDate(inputDate) {
    const date = new Date(inputDate);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

    return formattedDate;
}

const EventContent = ({ id }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    useEffect(() => {
        fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/' + id)
            .then(response => response.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error || !data) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setShowOrderSummary(false);
    };

    const handleProceed = () => {
        setShowOrderSummary(true);
    };



    return (
        <div className='py-12 flex gap-12 flex-col items-start px-40'>
            <img
                src={data.pic}
                className={"object-cover w-[100%] h-[50vh] rounded-3xl"}
                alt="Event Banner"
            />
            <section className='flex justify-between w-full font-bold text-3xl'>
                <h1 className=''>{data.title}</h1>
                <div className='flex gap-4 items-center'>
                    <FaRegStar />
                    <IoShareSocialOutline />
                </div>
            </section>
            <section className='flex justify-between w-full'>
                <div className='flex flex-col items-start gap-2'>
                    <h2 className='py-4 font-semibold text-2xl'>Date and Time</h2>
                    <div className='flex gap-2 items-center'>
                        <MdOutlineCalendarMonth />
                        <p>{formatDate(data.datetime)}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FaRegClock />
                        <p>{formatTimeRange(data.datetime, data.duration)}</p>
                    </div>
                </div>
                <div className='flex flex-col items-end gap-2'>
                    <button onClick={openPopup} className='rounded-md w-40 h-14 bg-[#FFE047] flex items-center justify-center gap-2'>
                        <IoTicketSharp />
                        Buy Tickets
                    </button>
                    <div>
                        <h2 className='py-4 font-semibold text-2xl'>
                            Ticket Information
                        </h2>
                        <div className='flex items-center gap-2'>
                            <IoTicketSharp />
                            Standard rate: {data.ticketprice} DT each
                        </div>
                        {data.discount !== 0 ? <div className='flex items-center gap-2'>
                            <IoTicketSharp />
                            Children&apos;s rate: {data.ticketprice - data.ticketprice * (data.discount / 100)} DT each
                        </div> : <></>}

                    </div>
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Location</h2>
                <div>
                    {data.location}
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Hosted by</h2>
                <div className='flex items-center gap-4'>
                    <p>{data.hostName}</p>
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Event Description</h2>
                <p>{data.description}</p>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Tags</h2>
                <div className='flex gap-2'>
                    {data.tags.map((element, index) => {
                        return (
                            <div className='bg-[#eae9eb] py-1 px-2 rounded-md' key={index}>{element}</div>
                        )
                    })}
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Links</h2>
                <div className='flex flex-col gap-2'>
                    {data.links.map((element, index) => {
                        return (
                            <Link key={index} target='_blank' href={element} className="cursor-pointer text-blue-500">
                                {element}
                            </Link>
                        )
                    })}
                </div>
            </section>
            <section className='w-full'>
                <h2 className='py-4 font-semibold text-2xl'>Other events you may like</h2>
                <EventSlider />
            </section>

            {isPopupOpen && (
                <TicketPopup
                    ticketCount={ticketCount}
                    setTicketCount={setTicketCount}
                    showOrderSummary={showOrderSummary}
                    handleProceed={handleProceed}
                    onClose={closePopup}
                    data={data}
                />
            )}
        </div>
    );
};

const Event = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Nav />
            <EventContent id={id} />
        </Suspense>
    );
};

export default Event;