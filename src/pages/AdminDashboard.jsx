import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

// AdminDashboard Component: Handles user provisioning, custom categories, and article auditing.
export default function AdminDashboard({ session, onArticleDeleted, refreshTrigger }) {
  // State for staff account creation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('REPORTER');
  const [message, setMessage] = useState('');

  // State for tracking all live articles
  const [allArticles, setAllArticles] = useState([]);

  // State for category taxonomy management
  const [newCategoryName, setNewCategoryName] = useState('');
  const [existingCategories, setExistingCategories] = useState([]);

  // Fetches all system articles for the admin deletion feed with explicit view metric validation
  const fetchAllArticlesForManagement = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/articles/all', {
        method: 'GET',
        headers: {
          'X-User-Role': session.role
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Maps the incoming database structure explicitly to ensure values fall back securely to 0 if undefined
        const validatedData = data.map(art => ({
          ...art,
          viewCount: art.viewCount !== undefined && art.viewCount !== null ? Number(art.viewCount) : 0
        }));
        setAllArticles(validatedData);
      }
    } catch (err) {
      console.error('Failed to load articles list for management.', err);
    }
  };

  // Loads the list of existing categories to display to the user
  const loadCategories = async () => {
    try {
      const res = await fetch('http://localhost:9090/api/categories/all');
      if (res.ok) {
        const data = await res.json();
        setExistingCategories(data);
      }
    } catch (err) {
      console.error('Failed processing category matrices.', err);
    }
  };

  // Synchronizes data when the dashboard mounts or receives a refresh trigger
  useEffect(() => {
    fetchAllArticlesForManagement();
    loadCategories();
  }, [refreshTrigger]);

  // Submits a new category name to the server database
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const response = await fetch('http://localhost:9090/api/categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': session.role
        },
        body: JSON.stringify({ name: newCategoryName.trim() })
      });

      if (response.ok) {
        alert('Custom category successfully synchronized with db architecture.');
        setNewCategoryName('');
        loadCategories();
        if (onArticleDeleted) onArticleDeleted(); 
      } else {
        const errText = await response.text();
        alert(`Validation fail: ${errText}`);
      }
    } catch (err) {
      alert('Connectivity processing error handling categories maps.');
    }
  };

  // Sends a delete request for a specific article ID
  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('Are you absolutely sure you want to permanently delete this article?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/api/articles/delete/${articleId}`, {
        method: 'DELETE',
        headers: {
          'X-User-Role': session.role
        }
      });

      if (response.ok) {
        alert('Article deleted successfully.');
        fetchAllArticlesForManagement(); 
        if (onArticleDeleted) onArticleDeleted();
      } else {
        const errMsg = await response.text();
        alert(`Deletion failed: ${errMsg}`);
      }
    } catch (err) {
      alert('Network connectivity failure during deletion.');
    }
  };

  // Handles registration requests for building new staff accounts
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:9090/api/auth/register-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': session.role
        },
        body: JSON.stringify({ username, password, role })
      });

      if (response.ok) {
        setMessage(`Success: ${role} account configuration complete!`);
        setUsername('');
        setPassword('');
      } else {
        const errText = await response.text();
        setMessage(`Error: ${errText || 'Failed to authorize profile configuration rules.'}`);
      }
    } catch (err) {
      setMessage('Backend engine connection error on port 9090.');
    }
  };

  return (
    <div className="news-admin-workspace">
      {/* Sidebar Section: Renders brand logo and active user permission level */}
      <aside className="news-admin-sidebar">
        <div className="sidebar-brand">
          <h1>Newsroom Today</h1>
          <span className="sidebar-badge">CONTROL</span>
        </div>
        <div className="sidebar-status">
          <div className="status-indicator-dot"></div>
          <div>
            <p className="status-label">Active Operator Role</p>
            <p className="status-value">{session?.role || "ADMIN"}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="news-admin-content">
        {/* Header Section: Displays dashboard title text */}
        <header className="content-main-header">
          <div>
            <h2 className="workspace-title">Newsroom Core Management</h2>
            <p className="workspace-subtitle">Configure editorial privileges, manage taxonomies, and audit live publications.</p>
          </div>
        </header>

        {/* Global Notification Banner */}
        {message && (
          <div className={`status-banner ${message.startsWith('Error') ? 'error' : 'success'}`}>
            <p>{message}</p>
          </div>
        )}

        <div className="workspace-grid">
          {/* Form Block: Account Creation Section (Only accessible by Admin roles) */}
          {session?.role === 'ADMIN' && (
            <section className="news-card">
              <div className="card-header">
                <h3>Staff Account Management Terminal</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateStaff}>
                  <div className="form-row">
                    <label>Staff Username</label>
                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                  </div>
                  <div className="form-row">
                    <label>Initial Access Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <div className="form-row">
                    <label>Assign Operations Tier</label>
                    <div className="select-dropdown-wrapper">
                      <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="REPORTER">REPORTER (Saves Draft Only)</option>
                        <option value="EDITOR">EDITOR (Can Publish Live Instantly)</option>
                        <option value="ADMIN">ADMIN (Full Access Control)</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="create-btn">Create Staff Account</button>
                </form>
              </div>
            </section>
          )}

          {/* Form Block: Section Taxonomy Creation and Category Cloud Display */}
          <section className="news-card">
            <div className="card-header">
              <h3>Sections</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateCategory} className="taxonomy-inline-form">
                <div className="form-row flex-grow">
                  <label>New Category Section Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Finance, Entertainment, Crime" 
                    value={newCategoryName} 
                    onChange={e => setNewCategoryName(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="action-btn-primary height-match">
                  Initialize Section
                </button>
              </form>

              <div className="live-categories-container">
                <span className="meta-label">Currently Synchronized Live Categories:</span>
                <div className="category-pill-cloud">
                  {existingCategories.map(cat => (
                    <span key={cat.id} className="category-pill">
                      {cat.name}
                    </span>
                  ))}
                  {existingCategories.length === 0 && <span className="empty-layer-msg">No metadata layers present inside storage engine.</span>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Content Feed Auditing Block: Article List and Deletion Actions (Only accessible by Admin roles) */}
        {session?.role === 'ADMIN' && (
          <>
            <h2 className="workspace-title" style={{ fontSize: '22px', marginTop: '40px' }}>Active Live Feed Management</h2>
            <div className="admin-articles-list">
              {allArticles.length === 0 ? (
                <p className="empty-feed-msg">No active articles found on the live feed server.</p>
              ) : (
                allArticles.map((art) => (
                  <div key={art.id} className="article-row-item">
                    <div className="article-meta-block">
                      <div className="article-title-row">
                        <strong className="article-headline">
                          {art.titleEn || art.titleHi}
                        </strong>
                        <span className={`status-badge-pill ${art.status === 'PUBLISHED' ? 'published' : 'draft'}`}>
                          {art.status}
                        </span>
                        <span className="metric-badge-views">
                          👁️ {art.viewCount.toLocaleString()} views
                        </span>
                      </div>
                      <span className="article-sub-details">
                        Category: <span className="sub-highlight">{art.category}</span> | Author: <span className="sub-highlight">{art.authorUsername}</span>
                      </span>
                    </div>
                    <div className="article-actions-block">
                      <button onClick={() => handleDeleteArticle(art.id)} className="action-btn-danger">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}