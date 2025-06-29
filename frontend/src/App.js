import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateAccountForm from './components/CreateAccountForm';
import CheckBalanceForm from './components/CheckBalanceForm';
import DepositForm from './components/DepositForm';
import WithdrawForm from './components/WithdrawForm';
import TransactionForm from './components/TransactionForm';
import AllAccounts from './components/AllAccounts';
import TransactionHistory from './components/TransactionHistory';

const Navigation = () => {
  const location = useLocation();

  // Hide navbar on Home page
  if (location.pathname === "/") return null;

  return (
    <nav style={{ textAlign:'center', padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ margin: "10px" }}>Home</Link>
      <Link to="/create-account" style={{ margin: "10px" }}>Create Account</Link>
      <Link to="/check-balance" style={{ margin: "10px" }}>Check Balance</Link>
      <Link to="/deposit" style={{ margin: "10px" }}>Deposit</Link>
      <Link to="/withdraw" style={{ margin: "10px" }}>Withdraw</Link>
      <Link to="/Transaction" style={{ margin: "10px" }}>Transfer</Link>
      <Link to="/AllAccounts" style={{ margin: "10px" }}>All Accounts</Link>
    

    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-account" element={<CreateAccountForm />} />
        <Route path="/check-balance" element={<CheckBalanceForm />} />
        <Route path="/deposit" element={<DepositForm />} />
        <Route path="/withdraw" element={<WithdrawForm />} />
        <Route path="/Transaction" element={<TransactionForm />} />
        <Route path="/AllAccounts" element={<AllAccounts />} />
        <Route path="/TransactionHistory" element={<TransactionHistory />} />

      </Routes>
    </Router>
  );
}

export default App;
