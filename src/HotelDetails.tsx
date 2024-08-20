import React, { useState } from 'react';
import axios from 'axios';
import './Hoteldetails.css'; 
import BackToHomeButton from './BackToHomeButton';


interface HotelDetail {
    name: string;
    address: string;
    numofrooms: number;
    availablerooms: number;
    occupiedrooms: number;
    costperroom: number;
}

const HotelDetails: React.FC = () => {
    const [hotelId, setHotelId] = useState<number | ''>('');
    const [hotel, setHotel] = useState<HotelDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchHotelDetails = async () => {
        if (hotelId === '') return; // No ID provided

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<HotelDetail>(`http://localhost:8080/user/users/hotels/${hotelId}`);
            setHotel(response.data);
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            setError('hotel not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hotel-details">
            <h2>Fetch Hotel Details</h2>
            <input
                type="number"
                placeholder="Enter Hotel ID"
                value={hotelId}
                onChange={(e) => setHotelId(Number(e.target.value))}
            />
            <button onClick={handleFetchHotelDetails}>Get Hotel Details</button>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {hotel && (
                <div className="hotel-info">
                    <h3>Hotel Details</h3>
                    <p><strong>Name:</strong> {hotel.name}</p>
                    <p><strong>Address:</strong> {hotel.address}</p>
                    <p><strong>Number of Rooms:</strong> {hotel.numofrooms}</p>
                    <p><strong>Available Rooms:</strong> {hotel.availablerooms}</p>
                    <p><strong>Occupied Rooms:</strong> {hotel.occupiedrooms}</p>
                    <p><strong>Cost per Room:</strong> ${hotel.costperroom.toFixed(2)}</p>
                </div>
            )}

            <BackToHomeButton />
        </div>
    );
};

export default HotelDetails;
