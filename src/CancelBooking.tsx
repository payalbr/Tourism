import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

const CancelBooking: React.FC = () => {
    const { userId } = useUserContext();
    const [bookingId, setBookingId] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleCancel = async () => {
        if (userId === null) {
            setError('User must be logged in to cancel a booking');
            return;
        }
        if (bookingId === '') {
            setError('Booking ID cannot be empty');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/users/cancel-booking', null, {
                params: { bookingId }
            });
            setMessage(`Cancellation requested! Booking ID: ${response.data.id}`);
            setError('');
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred');
                setMessage('');
            } else {
                setError('An unexpected error occurred');
                setMessage('');
            }
        }
    };

    return (
        <div>
            <h2>Cancel Booking</h2>
            <input
                type="number"
                placeholder="Booking ID"
                value={bookingId}
                onChange={(e) => setBookingId(Number(e.target.value))}
            />
            <button onClick={handleCancel}>Request Cancellation</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CancelBooking;
