import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../styles/pdfViewerCustom.css';

import useAuthUser from '../hooks/use-auth-user';

const TicketPopup = ({ ticketCount, setTicketCount, showOrderSummary, handleProceed, onClose, data }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const user = useAuthUser();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [ticketType, setTicketType] = useState('Standard rate');
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const proceedClicked = () => {
        if (!user) {
            setShowAuthPrompt(true);
        } else {
            handleProceed();
        }
    };

    const handlePayNow = async () => {
        setIsLoading(true); 
        const url = "https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets";
        const issueDate = new Date().toISOString();
        const ticketPrice = ticketType === 'Standard rate' ? data.ticketprice : data.ticketprice - (data.discount / 100) * data.ticketprice;

        const requests = Array.from({ length: ticketCount }, () => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: user.name,
                    userId: user.userId,
                    eventId: data.id,
                    eventName: data.title,
                    hostName: data.hostName,
                    issueDate: issueDate,
                    rate: ticketType,
                    ticketPrice: ticketPrice
                })
            });
        });

        try {
            const responses = await Promise.all(requests);
            const responseData = await Promise.all(responses.map(response => response.json()));
            const pdfUrl = responseData[0].pdfUrl; 
            setPdfUrl(pdfUrl);
            alert('Tickets purchased successfully!');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            alert('There was an error processing your request. Please try again.');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-[#F1F3F6] p-8 rounded-lg w-96">
                {showAuthPrompt ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Please log in or sign up to proceed</h2>
                        <div className="flex justify-between">
                            <a href="auth/login" className="bg-[#2D2C3C] text-white px-4 py-2 rounded-md mr-2">
                                Log In
                            </a>
                            <a href="auth/signup" className="bg-[#FFE047] text-white px-4 py-2 rounded-md">
                                Sign Up
                            </a>
                        </div>
                        <button onClick={() => setShowAuthPrompt(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4">
                            Close
                        </button>
                    </>
                ) : !showOrderSummary && !pdfUrl ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Select Number of Tickets</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Ticket Type:</label>
                            <select
                                value={ticketType}
                                onChange={(e) => setTicketType(e.target.value)}
                                className="border border-gray-300 p-2 w-full"
                            >
                                <option value="Standard rate">Standard rate</option>
                                {data.discount !== 0 ? <option value="Children's rate">Children&apos;s rate</option> : null}
                            </select>
                        </div>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            value={ticketCount}
                            min={1}
                            onChange={(e) => setTicketCount(parseInt(e.target.value))}
                        />
                        <button onClick={proceedClicked} className="bg-[#2D2C3C] text-white px-4 py-2 rounded-md mr-2">
                            Proceed
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                            Cancel
                        </button>
                    </>
                ) : !pdfUrl ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <p>Selected Tickets: {ticketCount}</p>
                        <p>Ticket Type: {ticketType}</p>
                        <p>Total Price: {ticketType === 'Standard rate' ? ticketCount * data.ticketprice : ticketCount * (data.ticketprice - data.ticketprice*(data.discount/100))} DT</p>
                        <button 
                            onClick={handlePayNow} 
                            className={`bg-[#2D2C3C] text-white px-4 py-2 rounded-md mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Processing...' : 'Pay Now'}
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-2">
                            Close
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Ticket PDF</h2>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer
                                fileUrl={pdfUrl}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        </Worker>
                        <a
                            href={pdfUrl}
                            download
                            className="bg-[#FFE047] text-white px-4 py-2 rounded-md"
                        >
                            Download PDF
                        </a>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4">
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TicketPopup;
