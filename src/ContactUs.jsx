import React, { useState } from 'react';

export const ContactUs = () => {
  const isSignedIn = localStorage.getItem('isSignedIn') === 'true';

  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, feedback }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Your enquiry has been sent! Thank you.');
        setName('');
        setFeedback('');
      } else {
        setMessage('Failed to send your enquiry. Please try again later.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (!isSignedIn) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Please sign in to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Please feel more than welcome to get in touch for any reason!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Enquiry:</label><br />
          <textarea
            placeholder="Enter your feedback, questions, enquiry, or additional comments here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={5}
            cols={50}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};