import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to NBank</h1>
      <p style={styles.subheading}>Choose an action below:</p>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/create-account')}>Create Account</button>
        <button style={styles.button} onClick={() => navigate('/check-balance')}>Check Balance</button>
        <button style={styles.button} onClick={() => navigate('/deposit')}>Deposit</button>
        <button style={styles.button} onClick={() => navigate('/withdraw')}>Withdraw</button>
        <button style={styles.button} onClick={() => navigate('/Transaction')}>Transfer</button>
        <button style={styles.button} onClick={() => navigate('/AllAccounts')}>All Accounts</button>
        <button Style={styles.button} onClick={() => navigate('/TransactionHistory')}>TransactionHistory</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#333',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '300px',
    margin: '0 auto',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    transition: 'background-color 0.3s',
  }
};

export default HomePage;
