import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleSignupToggle = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="App">
            {!isLoggedIn && !isSignup && (
                <Login onLogin={handleLogin} onSignupToggle={handleSignupToggle} />
            )}
            {!isLoggedIn && isSignup && (
                <Signup onLoginToggle={handleSignupToggle} />
            )}
            {isLoggedIn && <Dashboard />}
        </div>
    );
}

export default App;

