import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
    id: number;
    hotelId: number;
    rooms: number;
    fromDate: string;
    toDate: string;
    cost: number;
}

interface UserWithBookings {
    userId: number;
    username: string;
    bookings: Booking[];
}

const UsersDetails: React.FC = () => {
    const [usersWithBookings, setUsersWithBookings] = useState<UserWithBookings[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAllUsersWithBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/admin/users/details');
                setUsersWithBookings(response.data);
                setError('');
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data || 'An error occurred while fetching user details');
                } else {
                    setError('An unexpected error occurred');
                }
            }
        };

        fetchAllUsersWithBookings();
    }, []);

    return (
        <div>
            <h2>All Users Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {usersWithBookings.length > 0 ? (
                usersWithBookings.map(user => (
                    <div key={user.userId}>
                        <h3>Username: {user.username}</h3>
                        <h4>Bookings:</h4>
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
                                {user.bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.hotelId}</td>
                                        <td>{booking.rooms}</td>
                                        <td>{booking.fromDate}</td>
                                        <td>{booking.toDate}</td>
                                        <td>{booking.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default UsersDetails;
