// src/components/CheckBalanceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CheckBalanceForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://back-backend-k39c.onrender.com/api/accounts/${accountNumber}`);
      setBalance(response.data.balance);
      setError('');
    } catch (err) {
      setBalance(null);
      setError('Account not found or server error.');
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "2rem auto",
      padding: "1.5rem",
      border: "2px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>Check Account Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", fontSize: "16px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Check Balance
        </button>
      </form>
      {balance !== null && (
        <p style={{ marginTop: "1rem", color: "green", fontWeight: "bold" }}>
          Balance: ₹{balance}
        </p>
      )}
      {error && (
        <p style={{ marginTop: "1rem", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckBalanceForm;
