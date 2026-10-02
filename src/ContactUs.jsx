import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/react';

export const ContactUs = () => {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();

  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Could not find your account email. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mdekroao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          _replyto: email,
          message: feedback,
        }),
      });

      if (response.ok) {
        setMessage('Your enquiry has been sent! Thank you.');
        setName('');
        setFeedback('');
      } else {
        setMessage('Failed to send your enquiry. Please try again later.');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authLoaded || !userLoaded) {
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
      <h1>Contact Us</h1>
      <p>Please feel more than welcome to get in touch for any reason!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name">Name:</label><br />
          <input
            id="contact-name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="contact-feedback">Enquiry:</label><br />
          <textarea
            id="contact-feedback"
            placeholder="Enter your feedback, questions, enquiry, or additional comments here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={5}
            cols={50}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Submit'}
        </button>
      </form>

      {message && <p role="status">{message}</p>}
    </div>
  );
};