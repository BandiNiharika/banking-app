import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccountForm.css'; // 👈 Import CSS here

function CreateAccountForm() {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountType: '',
    balance: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://back-backend-k39c.onrender.coms/api/accounts/create", formData);
      setResponseMessage("✅ Account created successfully!");
      console.log(response.data);
    } catch (error) {
      setResponseMessage("❌ Failed to create account.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={formData.accountHolderName} onChange={handleChange} required />
        
        <select name="accountType" value={formData.accountType} onChange={handleChange} required>
          <option value="">Select Account Type</option>
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>
        
        <input type="number" name="balance" placeholder="Initial Balance" value={formData.balance} onChange={handleChange} required />
        
        <button type="submit">Create Account</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default CreateAccountForm;
