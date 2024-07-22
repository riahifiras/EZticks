import React from 'react';
import useAuthUser from '../hooks/use-auth-user';

const TicketPopup = ({ ticketCount, setTicketCount, showOrderSummary, handleProceed, handlePayNow, onClose, data }) => {
    const user = useAuthUser();
    
    const proceedClicked = () => {
        if (!user) {
            // User is not logged in, prompt them to log in
            window.alert('Please log in to proceed.');
        } else {
            // User is logged in, proceed with handleProceed function
            handleProceed();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-lg w-96">
                {!showOrderSummary ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Select Number of Tickets</h2>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 mb-4"
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
