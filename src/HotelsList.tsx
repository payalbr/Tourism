import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HotelsList.css'; 
import BackToHomeButton from './BackToHomeButton';


// Define the type for the hotel summary
interface HotelSummary {
    id: number;
    name: string;
}

const HotelsList: React.FC = () => {
    const [hotels, setHotels] = useState<HotelSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch hotels data from the API
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/users/hotels');
                console.log('Fetched hotels data:', response.data); // Debug logging
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error); // Debug logging
                setError('Failed to fetch hotels');
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // Render loading, error, or hotel list
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="hotels-list">
             <BackToHomeButton />
            <h2>Hotels List</h2>
            {hotels.length === 0 ? (
                <p>No hotels available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td>{hotel.id}</td>
                                <td>{hotel.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

           
        </div>
    );
};

export default HotelsList;
