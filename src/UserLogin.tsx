import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext'; // Import the useUserContext hook
import './Login.css'; // Import the CSS file

const UserLogin: React.FC = () => {
    const [userId, setUserId] = useState<number | ''>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { setUser } = useUserContext(); // Destructure the setUser function from the context

    const handleLogin = async () => {
        if (userId === '') {
            setError('User ID cannot be empty');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/user/users/login', {
                params: { userId, password }
            });

            setMessage(response.data); // Set success message
            setError(''); // Clear previous errors

            if (typeof userId === 'number') {
                setUser(userId); // Save userId in the context
                navigate('/user-operations');
            } else {
                setError('Invalid User ID');
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data); // Display backend error message
                setMessage(''); // Clear previous success messages
            } else {
                setError('An unexpected error occurred'); // Handle unexpected errors
                setMessage(''); // Clear previous success messages
            }
        }
    };

    return (
        <div className="bg-login">
            <div className="container">
                <h2>User Login</h2>
                <input
                    type="number"
                    placeholder="User ID"
                    value={userId === '' ? '' : userId}
                    onChange={(e) => setUserId(Number(e.target.value) || '')}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {message && <p style={{ color: 'white' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>    
    );
};

export default UserLogin;
