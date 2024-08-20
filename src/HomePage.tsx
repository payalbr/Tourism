import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
    return (
        <div className="bg-home-login">
            <div className="container">
                <h1>Indian Tourism Development Corporation (ITDC)</h1>
                <h2>Login as:</h2>
                <div className="button-container">
                    <Link to="/admin-login">
                        <button>Admin Login</button>
                    </Link>
                    <Link to="/user-login">
                        <button>User Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
