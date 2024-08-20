import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext'; // Import the useUserContext hook

const RechargeWallet: React.FC = () => {
    const [amount, setAmount] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleRecharge = async () => {
        if (amount === '' || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/user/users/recharge`, null, {
                params: { amount }
            });
            setMessage(`Wallet recharged successfully! New balance: ${response.data.wallet}`);
            setError('');
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data || 'An error occurred while recharging wallet');
                setMessage('');
            } else {
                setError('An unexpected error occurred');
                setMessage('');
            }
        }
    };

    return (
        <div>
            <h2>Recharge Wallet</h2>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={handleRecharge}>Recharge</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RechargeWallet;
