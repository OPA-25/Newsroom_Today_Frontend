import React from 'react';
import './Navbar.css';

export default function Navbar({ currentView, setCurrentView, session, onLogout }) {
  return (
    <nav className="top-navbar">
      {/* Brand logo just drops the staff view back to public page */}
      <div className="navbar-brand" onClick={() => setCurrentView('home')}>
        Newsroom Today
      </div> 
      
      <div className="nav-actions">
        {/* Public view shows ZERO buttons. Actions appear ONLY for active sessions */}
        {session && (
          <>
            {currentView !== 'home' ? (
              <button className="nav-btn portal-btn" onClick={() => setCurrentView('home')}>
                View Feed
              </button>
            ) : (
              <span className="staff-indicator-tag">{session.role} PORTAL ACTIVE</span>
            )}
            
            <button className="nav-btn logout-button" onClick={onLogout}>
              Logout ({session.username})
            </button>
          </>
        )}
      </div>
    </nav>
  );
}