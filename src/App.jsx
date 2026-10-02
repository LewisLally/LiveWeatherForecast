import { useNavigate, Routes, Route } from 'react-router-dom';
import { Show, SignInButton, SignUpButton, UserButton, useClerk } from '@clerk/react';

import { Home } from './HomePage/Home';
import { WeatherDetail } from './HomePage/WeatherDetail';
import { SignIn } from './SignIn';
import { CreateAccount } from './CreateAccount';
import { ContactUs } from './ContactUs';
import { AccountSettings } from './AccountSettings';

import backgroundImage from './background.jpg';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="overlay-content">
        <nav className="nav-bar">
          <button onClick={() => navigate('/')}>Home</button>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button>Create Account</button>
            </SignUpButton>
          </Show>

          <button onClick={() => navigate('/ContactUs')}>Contact Us</button>
          <button onClick={() => navigate('/AccountSettings')}>Account Settings</button>

          <Show when="signed-in">
            <UserButton />
            <button onClick={handleSignOut}>Sign Out</button>
          </Show>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/weather/:date" element={<WeatherDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;