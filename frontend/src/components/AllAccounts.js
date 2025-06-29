import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllAcounts.css'; 

function AllAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [editAccountNumber, setEditAccountNumber] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('https://back-backend-k39c.onrender.com/api/accounts/all');
      setAccounts(response.data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    }
  };

  const handleEditClick = (account) => {
    setEditAccountNumber(account.accountNumber);
    setEditData({
      accountHolderName: account.accountHolderName,
      accountType: account.accountType,
      balance: account.balance,
    });
    setMessage('');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (accountNumber) => {
    setMessage('');
    setError('');

    console.log("Saving account:", accountNumber);
    console.log("Edit data:", editData);

    if (editData.balance < 0) {
      setError("Balance cannot be negative.");
      return;
    }

    try {
      await axios.put(`http://localhost:9091/api/accounts/update/${accountNumber}`, editData);
      setMessage("Account updated successfully.");
      setEditAccountNumber(null);
      fetchAccounts();
    } catch (err) {
      console.error('Error updating:', err);
      setError("Failed to update account.");
    }
  };

  const handleDelete = async (accountNumber, balance) => {
    setMessage('');
    setError('');

    //if (balance > 0) {
      //setError("Cannot delete account with non-zero balance.");
      //return;
    //}

    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await axios.delete(`http://localhost:9091/api/accounts/delete/${accountNumber}`);
        setMessage("Account deleted successfully.");
        fetchAccounts();
      } catch (err) {
        console.error('Error deleting:', err);
        setError("Failed to delete account.");
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>All Accounts</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ margin: 'auto', borderCollapse: 'collapse' }} border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Holder Name</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              {editAccountNumber === account.accountNumber ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="accountHolderName"
                      value={editData.accountHolderName}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="accountType"
                      value={editData.accountType}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="balance"
                      value={editData.balance}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(account.accountNumber)}>Save</button>
                    <button onClick={() => setEditAccountNumber(null)} style={{ marginLeft: '5px' }}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{account.accountHolderName}</td>
                  <td>{account.accountType}</td>
                  <td>{account.balance}</td>
                  <td>
                    <button onClick={() => handleEditClick(account)}>Edit</button>
                    <button
                      onClick={() => handleDelete(account.accountNumber, account.balance)}
                      style={{ marginLeft: '5px', color: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllAccounts;
