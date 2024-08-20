import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserOperations.css'; 

const UserOperations: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="bg-home-login"> {/* Apply the background class */}
            <div className="container"> {/* Apply the container class */}
                <h2>User Operations</h2>
                <div className="button-container"> {/* Apply the button-container class */}
                    <button onClick={() => handleNavigation('/hotels-list')}>Hotel List</button>
                    <button onClick={() => handleNavigation('/hotel-details')}>Hotel Details</button>
                    <button onClick={() => handleNavigation('/book-rooms')}>Book Rooms</button>
                    <button onClick={() => handleNavigation('/cancel-booking')}>CancelBooking</button>
                    <button onClick={() => handleNavigation('/booking-details')}>BookingDetails</button>
                    <button onClick={() => handleNavigation('/recharge-wallet')}>RechargeWallet</button>
                    {/* Add other buttons as needed */}
                </div>
            </div>
        </div>
    );
};

export default UserOperations;
