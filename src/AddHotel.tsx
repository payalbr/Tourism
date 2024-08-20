import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddHotel.css'; // Ensure the path is correct

const AddHotel: React.FC = () => {
    const [hotel, setHotel] = useState({
        id: 0,
        name: '',
        address: '',
        numofrooms: 0,
        availablerooms: 0,
        occupiedrooms: 0,
        costperroom: 0.0,
    });
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Convert input values to correct types
        setHotel(prevHotel => ({
            ...prevHotel,
            [name]: name === 'id' || name === 'numofrooms' || name === 'availablerooms' || name === 'occupiedrooms'
                ? parseInt(value, 10)
                : name === 'costperroom'
                ? parseFloat(value)
                : value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/admin/admin/hotels', hotel);
            console.log('Response:', response); // Check the response
            setMessage('Hotel added successfully');
            setTimeout(() => navigate('/admin-operations'), 2000); // Redirect after 2 seconds to allow message display
        } catch (error: any) {
            console.error('Error:', error); // Log the error
            setMessage('Failed to add hotel');
        }
    };

    return (
        <div className="bg-home-login">
            <div className="container">
                <h2>Add Hotel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="hotelId">Hotel ID:</label>
                        <input
                            type="number"
                            id="hotelId"
                            name="id"
                            placeholder="Hotel ID"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numofrooms">Number of Rooms:</label>
                        <input
                            type="number"
                            id="numofrooms"
                            name="numofrooms"
                            placeholder="Number of Rooms"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availablerooms">Available Rooms:</label>
                        <input
                            type="number"
                            id="availablerooms"
                            name="availablerooms"
                            placeholder="Available Rooms"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="occupiedrooms">Occupied Rooms:</label>
                        <input
                            type="number"
                            id="occupiedrooms"
                            name="occupiedrooms"
                            placeholder="Occupied Rooms"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="costperroom">Cost per Room:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="costperroom"
                            name="costperroom"
                            placeholder="Cost per Room"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Add Hotel</button>
                </form>
                <p className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</p>
    

            </div>
        </div>
    );
};

export default AddHotel;
