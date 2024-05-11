import React, { useState } from 'react';
import "./index.css" // Import custom CSS file

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {Name:name, Email:email, Mobile_No:phone, DOB:dob};
    console.log(review);
    try {
      const response = await fetch('http://localhost:1337/api/user-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({data:review})

      });
    if (response.ok) {
      alert('Registration successful!');
      setName('');
      setEmail('');
      setPhone('');
      setDob('');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    setErrorMessage(error.message);
  }
};

return (
  <div className="registration-container">
    <h2>User Registration</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="int"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">Register</button>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
);
};

export default RegistrationForm;
