import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOperations.css'; 

const AdminOperations: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="bg-home-login"> {/* Apply the background class */}
            <div className="container"> {/* Apply the container class */}
                <h2>Admin Operations</h2>
                <div className="button-container"> {/* Apply the button-container class */}
                    <button onClick={() => handleNavigation('/add-hotel')}>Add Hotel</button>
                    <button onClick={() => handleNavigation('/hotel-list')}>Hotel List</button>
                    <button onClick={() => handleNavigation('/approve-cancellation')}>ApproveCancellation</button>
                    <button onClick={() => handleNavigation('/user-details')}>UserDetails</button>


                    {/* Add other buttons as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminOperations;
