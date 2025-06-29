import React, { useState } from 'react';

function TransactionHistory() {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTransactions([]);

    if (!accountNumber) {
      setError('Please enter an account number');
      return;
    }

    try {
      const response = await fetch(`https://back-backend-k39c.onrender.com/api/transactions/${accountNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
        
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '80vh',
      padding: '40px',
      background: '#f8f9fa'
    }}>
      <div style={{ width: '80%', maxWidth: '700px', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Transaction History</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label>
            Account Number: 
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>Get History</button>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {transactions.length > 0 ? (
          <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td>{new Date(txn.dateTime).toLocaleString()}</td>
                  <td>{txn.type}</td>
                  <td>{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center' }}></p>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
