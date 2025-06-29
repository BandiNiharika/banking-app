import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm() {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://back-backend-k39c.onrender.com/api/accounts/transfer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAccount,
          toAccount,
          amount,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(`✅ ${data}`);
      } else {
        setMessage(`❌ ${data}`);
      }
    } catch (error) {
      setMessage('❌ Error: Unable to complete transfer');
    }
  };

  return (
    <div className="transaction-container">
      <h2>Transfer Money</h2>
      <form className="transaction-form" onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="From Account"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="To Account"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Transfer</button>
      </form>
      {message && <p className="transaction-message">{message}</p>}
    </div>
  );
}

export default TransactionForm;
