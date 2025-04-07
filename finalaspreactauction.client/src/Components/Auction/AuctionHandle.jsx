import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Auction = () => {
    const [connection, setConnection] = useState(null);
    const [currentBid, setCurrentBid] = useState(null);
    const [userName, setUserName] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken'); 

        if (!token) {
            setMessage('Please Sign In First');
            return;
        }

        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7038/auctionHub', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .build();

        setConnection(connection);

        connection
            .start()
            .then(() => console.log('SignalR connected successfully'))
            .catch((err) => {
                console.error('SignalR Error:', err);
                setMessage('SignalR did not connected');
            });

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveBid', (userName, bidAmount) => {
                setCurrentBid({ userName, bidAmount });
            });
        }
    }, [connection]);

    const placeBid = async () => {
        if (!userName || !bidAmount) {
            setMessage('Invalid Username');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');

            const response = await fetch('https://localhost:7038/api/Auction/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify({ userName, bidAmount: parseFloat(bidAmount) }),
            });

            if (!response.ok) {
                setMessage('Offer Fetch Error. Please Try Again.');
                return;
            }

            setMessage('Offer send Succcessfully');
            setBidAmount('');
        } catch (err) {
            console.error('Offer Error:', err);
            setMessage('Error Try Again');
        }
    };

    return (
        <div>
            <h2>Auction</h2>
            {currentBid && (
                <p>Last Offer: <strong>{currentBid.userName}</strong> - ${currentBid.bidAmount}</p>
            )}
            <div>
                <input
                    type="text"
                    placeholder="User"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Bid Amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                />
                <button onClick={placeBid}>Bid</button>
            </div>
            {message && <p>{message}</p>} {/*Continue Here*/}
        </div>
    );
};

export default Auction;
