import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveCancellation: React.FC = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/admin/cancellation-requests');
            setRequests(response.data);
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleApprove = async () => {
        if (selectedRequestId === null) {
            setError('No request selected');
            return;
        }

        try {
            await axios.post('http://localhost:8080/admin/admin/approve-cancellation', null, {
                params: { bookingId: selectedRequestId }
            });
            setMessage('Cancellation approved successfully.');
            setError('');
            fetchRequests(); // Refresh request list
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred');
            setMessage('');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <h2>Approve Cancellation</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        Request ID: {request.id} | Booking ID: {request.id}
                        <button onClick={() => setSelectedRequestId(request.id)}>Select</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleApprove}>Approve Cancellation</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ApproveCancellation;
