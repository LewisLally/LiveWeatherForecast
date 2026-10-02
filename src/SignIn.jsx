import { useForm } from '@formspree/react';

export const SignIn = () => {
  const [state, handleSubmit] = useForm('mrpbqreq');

  if (state.succeeded) {
    return <p>Form submitted successfully.</p>;
  }

  return (
    <div className="form">
      <h1>Sign In</h1>
      <p><strong>Please sign in here!</strong></p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label><br />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={state.submitting}>
          {state.submitting ? 'Submitting…' : 'Sign In'}
        </button>

        {state.errors && <p>Could not submit the form. Please try again.</p>}
      </form>
    </div>
  );
};