import React, { useState } from 'react';
import { useAuth } from '@clerk/react';

export const AccountSettings = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const [nameOption, setNameOption] = useState('');
  const [emailOption, setEmailOption] = useState('');
  const [preferencesOption, setPreferencesOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailFrequencyOption, setEmailFrequencyOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameOption,
          forename,
          surname,
          emailOption,
          newEmail,
          preferencesOption,
          emailFrequencyOption,
          feedback,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Your enquiry has been sent! Thank you.');
        setNameOption('');
        setForename('');
        setSurname('');
        setEmailOption('');
        setNewEmail('');
        setPreferencesOption('');
        setEmailFrequencyOption('');
        setFeedback('');
      } else {
        setMessage('Failed to send your enquiry. Please try again later.');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p><strong>You must be signed in to view this page.</strong></p>
      </div>
    );
  }

  return (
    <div className="form">
      <h1>Account Settings</h1>
      <p>
        <strong>
          Come here to update your account details and email preferences
        </strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="AccSetContainer">
          <label htmlFor="name">Would you like to update your name?</label>
          <br />
          <select
            id="name"
            value={nameOption}
            onChange={(e) => setNameOption(e.target.value)}
            required
          >
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {nameOption === 'Yes' && (
          <>
            <div className="AccSetContainer">
              <label htmlFor="forename">Forename:</label>
              <br />
              <input
                id="forename"
                type="text"
                value={forename}
                onChange={(e) => setForename(e.target.value)}
                required
              />
            </div>

            <div className="AccSetContainer">
              <label htmlFor="surname">Surname:</label>
              <br />
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="AccSetContainer">
          <label htmlFor="emailAddress">
            Would you like to update your email address?
          </label>
          <br />
          <select
            id="emailAddress"
            value={emailOption}
            onChange={(e) => setEmailOption(e.target.value)}
            required
          >
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {emailOption === 'Yes' && (
          <div className="AccSetContainer">
            <label htmlFor="newEmail">New email address:</label>
            <br />
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="AccSetContainer">
          <label htmlFor="emailPreferences">
            Would you like to update your email preferences?
          </label>
          <br />
          <select
            id="emailPreferences"
            value={preferencesOption}
            onChange={(e) => setPreferencesOption(e.target.value)}
            required
          >
            <option value="">[please select]</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {preferencesOption === 'Yes' && (
          <div className="AccSetContainer">
            <label htmlFor="emailFrequency">
              Choose your email frequency:
            </label>
            <br />
            <select
              id="emailFrequency"
              value={emailFrequencyOption}
              onChange={(e) => setEmailFrequencyOption(e.target.value)}
              required
            >
              <option value="">[please select]</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly (from every Monday)</option>
              <option value="Monthly">Monthly (from every 1st)</option>
            </select>
          </div>
        )}

        <div className="AccSetContainer">
          <label htmlFor="settings-feedback">Your Feedback:</label>
          <br />
          <textarea
            id="settings-feedback"
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