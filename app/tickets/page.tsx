"use client";
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../styles/pdfViewerCustom.css';
import useAuthUser from '../hooks/use-auth-user';

const TicketsPage = () => {
    interface Ticket {
        id: string;
        eventName: string;
        ticketPrice: number;
    }
    
    const [data, setData] = useState<Ticket[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

    const usr = useAuthUser();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        fetch(`https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/user?userId=${usr?.userId}`)
            .then(response => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    setData([]); 
                }
                setIsLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [usr]);

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4">Error: {error}. Refresh please.</div>;
    }

    if (data.length === 0) {
        return <div className="p-4">No tickets available.</div>;
    }

    const handleToggle = (id: string) => {
        setExpandedTicket(expandedTicket === id ? null : id);
    };

    const handleDownload = (id: string) => {
        const url = `https://ticket-dev-yesss.s3.amazonaws.com/pdfs/ticket-${id}.pdf`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-${id}.pdf`;
        link.click();
    };

    const handleDelete = (id: string) => {
        const deleteUrl = `https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets/${id}`;

        fetch(deleteUrl, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete the event.');
                }
                setData(prevData => prevData.filter(event => event.id !== id));
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                    <Viewer
                                        fileUrl={`https://ticket-dev-yesss.s3.amazonaws.com/pdfs/ticket-${ticket.id}.pdf`}
                                        plugins={[defaultLayoutPluginInstance]}
                                    />
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
