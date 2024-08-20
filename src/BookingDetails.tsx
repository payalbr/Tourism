import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext'; // Import the useUserContext hook

interface Booking {
    id: number;
    hotelId: number;
    rooms: number;
    fromdate: string;
    todate: string;
    cost: number;
}

const BookingDetails: React.FC = () => {
    const { userId } = useUserContext(); // Access the userId from context
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchBookings = async () => {
            if (userId === null || userId === undefined) {
                setError('User ID is not available');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/user/users/bookings', {
                    params: { userId }
                });
                setBookings(response.data);
                setError('');
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data || 'An error occurred while fetching bookings');
                } else {
                    setError('An unexpected error occurred');
                }
            }
        };

        fetchBookings();
    }, [userId]);

    return (
        <div>
            <h2>Your Bookings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Hotel ID</th>
                        <th>Rooms</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.hotelId}</td>
                                <td>{booking.rooms}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.cost}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingDetails;
