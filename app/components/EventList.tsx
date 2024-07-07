"use client"
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';



export interface Event {
    title: string;
    description: string;
    dateTime: string;  // Assuming dateTime is a string in ISO format
    hostId: number;
    ticketPrice: number;
    slots: number;
    pics: string[];  // Assuming pics is an array of strings (URLs)
    discount: number;
    tags: string[];
    id: string;
}



const EventList: React.FC = () => {
    const [data, setData] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // Replace 'your-api-url' with the actual URL
        fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events')
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

    return (
        <div className="w-full h-fit grid grid-cols-2 gap-4 py-4 px-20">
            {data.length > 0 ? (
                data.map((event, index) => <EventCard event={event}/>
                
                )
            ) : (
                <p>No events available.</p>
            )}
        </div>
    );
};

export default EventList;
