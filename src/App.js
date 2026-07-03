import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [session, setSession] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // 🔄 FIX: Read from sessionStorage instead of localStorage for strict tab isolation
    const savedSession = sessionStorage.getItem('newsroom_session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }

    // 🔒 HIDDEN GATEWAY CHECK: Look for secret query parameter "?portal=securedesk"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('portal') === 'securedesk') {
      setCurrentView('login');
      // Clean the URL bar immediately so the secret code isn't left visible
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    // 🔄 FIX: Save exclusively to sessionStorage so it doesn't leak to other tabs
    sessionStorage.setItem('newsroom_session', JSON.stringify(userData));
    setSession(userData);
    setCurrentView('home');
  };

  const handleLogout = () => {
    // 🔄 FIX: Clear only this specific tab's session cache data on exit
    sessionStorage.removeItem('newsroom_session');
    setSession(null);
    setCurrentView('home');
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        session={session} 
        onLogout={handleLogout} 
      />
      
      <main className="main-content-area">
        {currentView === 'home' && (
          <Home session={session} />
        )}
        
        {currentView === 'login' && !session && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  );
}

export default App;