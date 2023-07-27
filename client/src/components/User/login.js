import React from 'react';
import axios from 'axios';
//login function
export const Login = () => {

    const [formData, setFormData] = React.useState({
        customerEmail: '',
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
        // Make the API call to log in the user
        const response = await axios.post('http://localhost:4000/login', formData);
    
        // Handle the response (you may show a success message or redirect the user)
        console.log('Login successful:', response.data);
        // Redirect the user to the home page
        window.location.href = '/';
        } catch (error) {
        // Handle login errors (you may show an error message)
        console.error('Login failed:', error.message);
        //pop up error message
        alert('Login failed:', error.message);
        //clear the form
        setFormData({
            customerEmail: '',
            customerPassword: ''
        });
        }
    };
    
    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label htmlFor="customerEmail">Email:</label>
            <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />
    
            <label htmlFor="customerPassword">Password:</label>
            <input type="password" id="customerPassword" name="customerPassword" value={formData.customerPassword} onChange={handleChange} />
    
            <button type="submit" id="login-btn">Login</button>
        </form>
        </div>
    );
}