
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import party from "../assets/images/party.jpg"
import { IoTicketSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import EventSlider from '../components/EventSlider';
import { useSearchParams } from 'next/navigation';



const Event = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [data, setData] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // Replace 'your-api-url' with the actual URL
        fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/'+id)
            .then(response => response.json())
            .then((data: Event[]) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }
    
    console.log(data.pics[0]);
    
    
    const tags = [
        "Cybersecurity",
        "CTF",
        "Competition"
    ]

    return (
        <div className='flex gap-12 flex-col items-start py-12 px-40'>
            <img
                src={"data:image/jpeg;base64,"+data.pics[0]}
                className={"object-cover w-[100%] h-[50vh] rounded-3xl"}
                alt="Hero Illustration"
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
                        <p>Saturday, 2 December 2023</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FaRegClock />
                        <p>6:30 PM - 9:30 PM</p>
                    </div>
                    <button className='text-[#4539B4]'>+ Add to Calendar</button>
                </div>
                <div className='flex flex-col items-end gap-2'>
                    <button className='rounded-md w-40 h-14 bg-[#FFE047] flex items-center justify-center gap-2'>
                        <IoTicketSharp />
                        Buy Tickets
                    </button>
                    <div>
                        <h2 className='py-4 font-semibold text-2xl'>
                            Ticket Information
                        </h2>
                        <div className='flex items-center gap-2'>
                            <IoTicketSharp />
                            Standard Ticket: 20DT each
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Location</h2>
                <div>
                    123 Ariana street, Ariana, Tunisia
                </div>
            </section>
            <section>
                <h2 className='py-4 font-semibold text-2xl'>Hosted by</h2>
                <div className='flex items-center gap-4'>
                    <Image
                        src={party}
                        className={"object-cover w-20 h-20  rounded-full"}
                        alt="Hero Illustration"
                        loading="eager"
                        placeholder="blur"
                    />
                    <div className='flex flex-col gap-2'>
                        <p>City Youth Movement</p>
                        <div className='flex gap-2'>
                            <button className='px-3 py-1 border-2 border-[#2B293D] rounded-md'>Contact</button>
                            <button className='px-3 py-1 text-white bg-[#2B293D] rounded-md'>+ Follow</button>
                        </div>
                    </div>
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
            <section className='w-full'>
                <h2 className='py-4 font-semibold text-2xl'>Other events you may like</h2>
                <EventSlider />
            </section>
        </div>
    )
}

export default Event