import React, { useState } from 'react';

export const AccountSettings = () => {
  const isSignedIn = localStorage.getItem('isSignedIn') === 'true';

  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailPreferences, setEmailPreferences] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emailAddress, emailPreferences, feedback }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Your enquiry has been sent! Thank you.');
        setName('');
        setEmailAddress('');
        setEmailPreferences('');
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
      <h1>Account Details</h1>
      <p>Come here to update your account details and email preferences</p>
      <form onSubmit={handleSubmit}>
        <div className="AccSetContainer">
          <label>Would you like to update your name?:</label><br />
          <select id="name" value={name} onChange={(e) => setName(e.target.value)} required>
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="AccSetContainer">
          <label>Would you like to update your email address?:</label><br />
          <select
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          >
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="AccSetContainer">
          <label>Would you like to update your email preferences?:</label><br />
          <select
            id="emailPreferences"
            value={emailPreferences}
            onChange={(e) => setEmailPreferences(e.target.value)}
            required
          >
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="AccSetContainer">
          <label>Your Feedback:</label><br />
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};