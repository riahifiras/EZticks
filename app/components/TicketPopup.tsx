import React from 'react';
import useAuthUser from '../hooks/use-auth-user';

const TicketPopup = ({ ticketCount, setTicketCount, showOrderSummary, handleProceed, onClose, data }) => {
    const user = useAuthUser();
    const [showAuthPrompt, setShowAuthPrompt] = React.useState(false);
    const [ticketType, setTicketType] = React.useState('Standard rate');

    const proceedClicked = () => {
        if (!user) {
            setShowAuthPrompt(true);
        } else {
            handleProceed();
        }
    };

    const handlePayNow = async () => {
        const url = "https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets";
        const issueDate = new Date().toISOString();
        const ticketPrice = ticketType === 'Standard rate' ? data.ticketprice : data.ticketprice - data.ticketprice * 0.1;

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
                    hostId: data.hostid,
                    issueDate: issueDate,
                    rate: ticketType,
                    ticketPrice: ticketPrice
                })
            });
        });

        try {
            await Promise.all(requests);
            alert('Tickets purchased successfully!');
            onClose();
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            alert('There was an error processing your request. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-[#F1F3F6] p-8 rounded-lg w-96">
                {showAuthPrompt ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Please log in or sign up to proceed</h2>
                        <div className="flex justify-between">
                            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                                Log In
                            </a>
                            <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Sign Up
                            </a>
                        </div>
                        <button onClick={() => setShowAuthPrompt(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4">
                            Close
                        </button>
                    </>
                ) : !showOrderSummary ? (
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
                                <option value="Children's rate">Children's rate</option>
                            </select>
                        </div>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            value={ticketCount}
                            onChange={(e) => setTicketCount(parseInt(e.target.value))}
                        />
                        <button onClick={proceedClicked} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                            Proceed
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <p>Selected Tickets: {ticketCount}</p>
                        <p>Ticket Type: {ticketType}</p>
                        <p>Total Price: {ticketCount * data.ticketprice} DT</p>
                        <button onClick={handlePayNow} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                            Pay Now
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-2">
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TicketPopup;
