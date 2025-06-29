// src/components/WithdrawForm.js
import React, { useState } from 'react';
import axios from 'axios';

const WithdrawForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://back-backend-k39c.onrender.com/api/accounts/withdraw/${accountNumber}`, {
        amount: parseFloat(amount),
      });
      setMessage(`₹${amount} withdrawn successfully. New balance: ₹${response.data.balance}`);
      setError('');
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Withdrawal failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1rem' }}>Withdraw Money</h2>
      <form onSubmit={handleWithdraw}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#b91c1c', color: 'white', border: 'none', borderRadius: '4px' }}>
          Withdraw
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WithdrawForm;
