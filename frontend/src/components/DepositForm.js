import React, { useState } from 'react';
import axios from 'axios';
import './DepositForm.css';

const DepositForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://back-backend-k39c.onrender.com/api/accounts/deposit', {
        accountNumber,
        amount: parseFloat(amount),
      });
      setMessage(`Deposit successful! New balance: ₹${response.data.balance}`);
    } catch (error) {
      setMessage('Error during deposit: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <dev className="form-container">
      {
    <div style={containerStyle}>
      <h2>Deposit Money</h2>
      <form onSubmit={handleDeposit} style={formStyle}>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <p></p>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <p></p>
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    }
    </dev>
  );
};

const containerStyle = {
  textAlign: 'center',
  marginTop: '2rem',
};

const formStyle = {
  display: 'inline-block',
  padding: '1rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
};

export default DepositForm;
