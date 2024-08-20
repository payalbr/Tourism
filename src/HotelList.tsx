// HotelsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hotel } from './Interfaces'; // Adjust the import path as needed
import './HotelList.css';
import BackToHomeButton from './BackToHomeButton';


const HotelsList: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [jsonData, setJsonData] = useState<string | null>(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/admin/hotels');
                console.log('Fetched hotels data:', response.data); // Log the entire response

                // Assuming the API returns an array of hotels
                if (Array.isArray(response.data)) {
                    // Process the data to filter out nested details
                    const processedHotels: Hotel[] = response.data.map((hotel: any) => ({
                        id: hotel.id,
                        name: hotel.name,
                        address: hotel.address,
                        numofrooms: hotel.numofrooms,
                        availablerooms: hotel.availablerooms,
                        occupiedrooms: hotel.occupiedrooms,
                        costperroom: hotel.costperroom
                        // No need to include bookings or user details
                    }));

                    setHotels(processedHotels);
                    setJsonData(JSON.stringify(processedHotels, null, 2)); // Format JSON for display
                } else {
                    console.error('Data is not in the expected format:', response.data);
                    setError('Unexpected data format');
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setError('Failed to fetch hotels');
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="hotels-list">
            <h2>Hotels List</h2>
            {hotels.length === 0 ? (
                <p>No hotels available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Number of Rooms</th>
                            <th>Available Rooms</th>
                            <th>Occupied Rooms</th>
                            <th>Cost per Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td>{hotel.id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.numofrooms}</td>
                                <td>{hotel.availablerooms}</td>
                                <td>{hotel.occupiedrooms}</td>
                                <td>${hotel.costperroom.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h3>Raw Data (JSON Format)</h3>
            <pre>{jsonData}</pre> {/* Display JSON data */}

            <BackToHomeButton />
        </div>
    );
};

export default HotelsList;
