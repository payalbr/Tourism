import React, { useState } from 'react';
import axios from 'axios';
import BackToHomeButton from './BackToHomeButton';

function RegisterUser() {
  const [userId, setUserId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState<number | ''>('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/users', {
        id: userId,
        name,
        password,
        wallet
      });
      setMessage('Registration successful. You can now log in.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data || 'An error occurred');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Wallet Balance"
        value={wallet}
        onChange={(e) => setWallet(Number(e.target.value))}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}

      <BackToHomeButton />
    </div>
  );
}

export default RegisterUser;
