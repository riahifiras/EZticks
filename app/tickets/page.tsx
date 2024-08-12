"use client";
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const TicketsPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Set to true initially
    const [expandedTicket, setExpandedTicket] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/user?userId=6448f4b8-e011-70f0-2e45-6bf7520bbf64')
            .then(response => response.json())
            .then((data) => {
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

    const handleToggle = (id: number) => {
        setExpandedTicket(expandedTicket === id ? null : id);
    };

    const handleDownload = (id: number) => {
        const url = `https://ticket-dev-yesss.s3.amazonaws.com/pdfs/ticket-${id}.pdf`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-${id}.pdf`;
        link.click();
    };

    const handleDelete = (id: number) => {
        // Implement the function to delete the entry from the database
        console.log(`Delete ticket with id: ${id}`);
    };

    return (
        <div>
            <Nav />
            <div className='flex flex-col py-20 px-40 gap-4'>
                {data.map((ticket, index) => (
                    <div key={index} className='w-full border-2 rounded-xl flex flex-col px-8 py-8 min-h-24'>
                        <div className='flex justify-between items-center'>
                            <h1>{ticket.id}</h1>
                            <p>{ticket.eventName}</p>
                            <p>{ticket.ticketPrice}DT</p>
                            <div
                                className={`text-3xl cursor-pointer transform transition-transform ${expandedTicket === ticket.id ? 'rotate-180' : ''}`}
                                onClick={() => handleToggle(ticket.id)}
                            >
                                {expandedTicket === ticket.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </div>
                        {expandedTicket === ticket.id && (
                            <div className='mt-4'>
                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js`}>
                                    <Viewer fileUrl={`https://ticket-dev-yesss.s3.amazonaws.com/pdfs/ticket-${ticket.id}.pdf`} />
                                </Worker>
                                <div className='mt-4 flex gap-4'>
                                    <button
                                        onClick={() => handleDownload(ticket.id)}
                                        className='px-4 py-2 bg-blue-500 text-white rounded'
                                    >
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ticket.id)}
                                        className='px-4 py-2 bg-red-500 text-white rounded'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketsPage;