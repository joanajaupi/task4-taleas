import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export const Signup = () => {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to sign up the user
      const response = await axios.post('http://localhost:4000/customers', formData);

      // Handle the response (you may show a success message or redirect the user)
      console.log('Signup successful:', response.data);
      // Redirect the user to the login page
      navigate('/');
    } catch (error) {
      // Handle signup errors (you may show an error message)
      console.error('Signup failed:', error.message);
      //pop up error message
      alert('Signup failed:', error.message);
      //clear the form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerPassword: ''
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label htmlFor="customerName">Full Name:</label>
        <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} />

        <label htmlFor="customerEmail">Email:</label>
        <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />

        <label htmlFor="customerPhone">Phone:</label>
        <input type="tel" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />

        <label htmlFor="customerPassword">Password:</label>
        <input
          type="password"
          id="customerPassword"
          name="customerPassword"
          value={formData.customerPassword}
          onChange={handleChange}
        />

        <button type="submit" id="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};
