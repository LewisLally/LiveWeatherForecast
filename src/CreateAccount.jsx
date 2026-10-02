import { useState } from 'react';

export const CreateAccount = () => {
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      forename === '' || surname === '' || email === '' || confirmEmail === '' || password === '' || confirmPassword === '') {
      setMessage('Please fill in all required fields.');
      return;
    }

    if (email !== confirmEmail) {
      setMessage('Emails do not match.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    localStorage.setItem('isSignedIn', 'true');
    setMessage(`Thank you for creating an account with us, ${forename} ${surname}!`);
  };

  return (
    <div>
      <div className="form">
      <h1>Create Account</h1>
      <p><strong>No account? Create one here!</strong></p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Forename:</label><br />
          <input
            type="text"
            placeholder="Enter your forename"
            value={forename}
            onChange={(e) => setForename(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Surname:</label><br />
          <input
            type="text"
            placeholder="Enter your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Email:</label><br />
          <input
            type="email"
            placeholder="Confirm your email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};