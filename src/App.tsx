// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import AdminOperations from './AdminOperations';
import AddHotel from './AddHotel';
import HotelList from './HotelList';
import HomePage from './HomePage'; 
import UserOperations from './UserOperations';
import HotelsList from './HotelsList';
import HotelDetails from './HotelDetails';
import BookRoom from './BookRoom';
import RegisterUser from './RegisterUser';
import { UserProvider } from './UserContext'; // Import UserProvider
import CancelBooking from './CancelBooking';
import ApproveCancellation from './ApproveCancellation';
import BookingDetails from './BookingDetails';
import RechargeWallet from './Rechargewallet';
import UserDetails from './Userdetails';

const App: React.FC = () => {
    return (
        <UserProvider> 
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* Use HomePage component */}
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/user-login" element={<UserLogin />} />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/admin-operations" element={<AdminOperations />} />
                    <Route path="/add-hotel" element={<AddHotel />} />
                    <Route path="/hotel-list" element={<HotelList />} />
                    <Route path="/user-operations" element={<UserOperations />} />
                    <Route path="/hotels-list" element={<HotelsList />} />
                    <Route path="/hotel-details" element={<HotelDetails />} />
                    <Route path="/book-rooms" element={<BookRoom />} />
                    <Route path="/cancel-booking" element={<CancelBooking />} />
                    <Route path="/approve-cancellation" element={<ApproveCancellation />} />
                    <Route path="/booking-details" element={<BookingDetails />} />
                    <Route path="/recharge-wallet" element={<RechargeWallet />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    
                   
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
