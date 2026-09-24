import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Home } from './HomePage/Home';
import { WeatherDetail } from './WeatherDetailPage/WeatherDetail';
import { SignIn } from './SignInPage/SignIn';
import { CreateAccount } from './CreateAccount';
import { ContactUs } from './ContactUs';
import { AccountSettings } from './AccountSettings';
import './App.css';

function App() {
  const navigate = useNavigate();
  
  return (
    <div>
      <nav className="nav-bar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/SignIn')}>Sign In</button>
        <button onClick={() => navigate('/CreateAccount')}>Create Account</button>
        <button onClick={() => navigate('/ContactUs')}>Contact Us</button>
        <button onClick={() => navigate('/AccountSettings')}>Account Settings</button>
      </nav>

      <div className="hiya">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/AccountSettings' element={<AccountSettings />} />
          <Route path='/weather/:date' element={<WeatherDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;