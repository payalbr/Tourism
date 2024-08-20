import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/admin/login', {
                params: { username, password }
            });
            setMessage(response.data);
            // Redirect to Admin Operations page on successful login
            navigate('/admin-operations');
        } catch (error: any) {
            setMessage(error.response ? error.response.data : 'Error logging in');
        }
    };

    return (
        <div className="bg-login">
            <div className="container">
                <h2>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <p>{message}</p>
            </div>
        </div>    
    );
};

export default AdminLogin;
