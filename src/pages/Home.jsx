import React, { useState, useEffect, useCallback } from 'react';
import AdminDashboard from './AdminDashboard';
import StaffWorkspace from './StaffWorkspace';
import { 
  Share2, 
  Send, 
  Link2, 
  Check 
} from 'lucide-react';
import './Home.css';

/* SEO ARCHITECTURE NOTE 
  1. Semantic Layout: Using <header>, <nav>, <main>, <article>, and <aside>
     guarantees clean search crawler parsing for indexing logic.
  2. Dynamic Language Tags: The 'lang' property dynamically switches between 
     English ('en') and Hindi ('hi') to preserve localization crawling integrity.
  3. Accessible Media Elements: Every image maps dedicated alternative 'alt' texts, 
     and interactive videos use semantic attributes to prevent crawler penalties.
*/

/* CLIENT AD ENGINE OVERVIEW 
  To maximize client satisfaction, this dashboard renders a diverse mix 
  of ad formats across individual layout ecosystems concurrently:
  - "top" zone     : Programmatic Monetization Script Target (AdSense Mockup)
  - "feed" zone    : Highly Visible Client Hyperlink Direct Image Banner 
  - "sidebar" zone : Rich Media Autoplay Outstream HTML5 Video Advertisement
*/

function FlexibleAdComponent({ zoneId, defaultLabel }) {
  useEffect(() => {
    // If the top layout utilizes live script injections, bootstrap the global array safely
    if (zoneId === "top") {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn("Programmatic script loop tracking queued safely:", e);
      }
    }
  }, [zoneId]);

  // ZONE 1: TOP LEADERBOARD -> Programmatic AdSense Format Loop
  if (zoneId === "top") {
    return (
      <div className="client-ad-container programmatic-display-unit">
        {/* SEO SAFEGUARD: Marked with explicit data-ad layout parameters to separate from editorial indexing */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', minHeight: '90px' }}
             // CONFIGURATION KEY: Replace ca-pub-XXXXXXXXXXXXXXXX with your actual Google AdSense Publisher ID
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
             // CONFIGURATION KEY: Replace 1111111111 with your specific AdSense unit ad slot identifier number
             data-ad-slot="1111111111"
             data-ad-format="horizontal"
             data-full-width-responsive="true">
          <div style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', padding: '20px', textAlign: 'center', border: '1px dashed #cbd5e1', borderRadius: '6px' }}>
            <strong>{defaultLabel}</strong> — [Live Programmatic Network Loop Engine Active]
          </div>
        </ins>
      </div>
    );
  }

  // ZONE 2: IN-FEED BANNER -> Direct Image Hyperlink Banner Layout
  if (zoneId === "feed") {
    return (
      <div className="client-ad-container direct-image-sponsor-unit">
        {/* SEO SAFEGUARD: 'rel="noopener noreferrer"' preserves indexing isolation boundaries */}
        {/* CONFIGURATION KEY: Replace URL with your direct sponsor landing page target track link */}
        <a href="https://client-sponsor.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%' }}>
          <img 
            // CONFIGURATION KEY: Replace placeholder URL with your real live hosted promotional banner image asset path
            src="https://placehold.co/620x100/1e293b/ffffff?text=Premium+Sponsor+Image+Banner+620x100" 
            alt="Premium Editorial Direct Sponsorship Campaign" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }} 
          />
        </a>
      </div>
    );
  }

  // ZONE 3: SIDEBAR -> Rich Media Interactive Autoplay Video Unit
  if (zoneId === "sidebar") {
    return (
      <div className="client-ad-container video-outstream-ad-unit" style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#000', borderRadius: '6px' }}>
        {/* BROWSER SAFEGUARD: autoPlay is explicitly 'muted' and 'playsInline' to prevent browser rendering blockages */}
        <video 
          // CONFIGURATION KEY: Replace sample video asset URL path with your hosted mp4/webm outstream advertisement link
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          autoPlay 
          muted 
          loop 
          playsInline
          controls
        />
        <div style={{ 
          position: 'absolute', 
          top: '8px', 
          right: '8px', 
          background: 'rgba(15, 23, 42, 0.85)', 
          color: '#fff', 
          fontSize: '10px', 
          fontWeight: 'bold',
          padding: '3px 7px', 
          borderRadius: '4px',
          pointerEvents: 'none',
          letterSpacing: '0.5px'
        }}>
          Video Advertisement
        </div>
      </div>
    );
  }

  return null;
}

// Inline Lightweight SVGs for cross-platform dependency resilience
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export default function Home({ session }) {
  const [articles, setArticles] = useState([]);
  const [lang, setLang] = useState('en'); 
  const [selectedArticle, setSelectedArticle] = useState(null); 
  const [currentTab, setCurrentTab] = useState('HOMEFEED');
  const [categories, setCategories] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // CONFIGURATION KEY: Replace G-XXXXXXXXXX with your official live production Google Analytics 4 (GA4) Measurement ID string key number
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

  // Hook to asynchronously initialize the Global Google Analytics tag layer securely
  useEffect(() => {
    if (!window.gtag) {
      const scriptId = 'google-analytics-gtag';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        // Loads the official script engine tracking file using the measurement key variable defined above
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          send_page_view: false // Disabling automatic hits to control custom historical virtual pages
        });
      }
    }
  }, [GA_MEASUREMENT_ID]);

  // Track virtual paths when tabs clear out or individual articles load explicitly
  useEffect(() => {
    if (window.gtag) {
      const currentPath = window.location.pathname + window.location.search;
      const currentTitle = selectedArticle 
        ? (lang === 'en' ? selectedArticle.titleEn : selectedArticle.titleHi)
        : `Wire Feed Hub - ${currentTab}`;

      // Sends page view metadata directly to Google Analytics stream logs
      window.gtag('event', 'page_view', {
        page_title: currentTitle,
        page_location: window.location.href,
        page_path: currentPath
      });
    }
  }, [selectedArticle, currentTab, lang]);

  // API ROUTING ENDPOINT: Fetches publicly visible publications from the database server layer
  const fetchLiveNews = useCallback(async () => {
    try {
      // CONFIGURATION KEY: Update 'http://localhost:9090' to your live production API gateway server base URL address
      const response = await fetch('http://localhost:9090/api/articles/public');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (err) {
      console.error('Failed fetching data from database:', err);
    }
  }, []);

  // API ROUTING ENDPOINT: Fetches all news category structures for top sub-menu layouts
  const fetchCategories = useCallback(async () => {
    try {
      // CONFIGURATION KEY: Update 'http://localhost:9090' to match your production API port or server domain
      const res = await fetch('http://localhost:9090/api/categories/all');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed resolving categorical sync maps:', err);
    }
  }, []);

  // Parses parameter values out of URL to show persistent routes on refreshing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId && articles.length > 0) {
      const matched = articles.find(a => (a.id || a._id) === articleId);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  }, [articles]);

  // Refreshes data sources across internal sub-components on creation/destruction updates
  const triggerGlobalRefresh = () => {
    fetchLiveNews();
    fetchCategories();
    setRefreshToggle(prev => !prev);
  };

  useEffect(() => {
    fetchLiveNews();
    fetchCategories();
  }, [fetchLiveNews, fetchCategories]);

  // Registers click tracking and triggers updates to back-end view calculation nodes
  const handleSelectArticleWithTracking = async (item) => {
    setSelectedArticle(item);
    const newUrl = `${window.location.origin}${window.location.pathname}?article=${item.id || item._id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    try {
      // API ROUTING ENDPOINT: Increments internal read traffic statistics within back-end system metrics
      // CONFIGURATION KEY: Update host or port parameter if backend service configurations change
      await fetch(`http://localhost:9090/api/articles/public/increment-view/${item.id || item._id}`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error("Background view tracking synchronization tracing suspended:", error);
    }
  };

  // Resets tracking attributes and parameters back to simple feed URLs
  const handleBackToFeed = () => {
    setSelectedArticle(null);
    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({ path: cleanUrl }, '', cleanUrl);
  };

  // Helper: Splits double-pipe delimited strings to fetch original single source targets
  const displaySingleImageSource = (rawUrlString) => {
    if (!rawUrlString) return null;
    return rawUrlString.includes('|||') ? rawUrlString.split('|||')[0] : rawUrlString;
  };

  // Helper: Unpacks split image parameters for full slideshow rendering arrays
  const displayAllImageSources = (rawUrlString) => {
    if (!rawUrlString) return [];
    return rawUrlString.includes('|||') ? rawUrlString.split('|||') : [rawUrlString];
  };

  // Truncates descriptive paragraph texts down to brief card sizes
  const getShortSnippet = (text, maxLength = 130) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  // Converts native timestamps into localized system date read formats
  const formatArticleDate = (timestampString) => {
    if (!timestampString) return 'Just Now';
    try {
      const date = new Date(timestampString);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Recent';
    }
  };

  // Compiles outbound social interaction redirect URLs for client clicks
  const getShareLinks = (article) => {
    const id = article.id || article._id;
    const shareUrl = encodeURIComponent(`${window.location.origin}${window.location.pathname}?article=${id}`);
    const shareTitle = encodeURIComponent(lang === 'en' ? article.titleEn : article.titleHi);

    return {
      whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      // CONFIGURATION KEY: Replace with custom brand link targets if running direct promotional channel networks
      youtube: `https://www.youtube.com`, 
      instagram: `https://www.instagram.com`, 
      rawUrl: `${window.location.origin}${window.location.pathname}?article=${id}`
    };
  };

  // Copies targeted story link metrics onto user system clipboards
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filters general data list down to specific category classifications
  const filteredArticles = currentTab === 'HOMEFEED' 
    ? articles 
    : articles.filter(item => item.category === currentTab);

  return (
    <div className="home-container">
      
      {/* BRAND HEADER BAR */}
      <header className="portal-main-header" role="banner">
        <div className="header-top-meta">
          <span className="live-pulse-indicator">● LIVE WIRE NETWORK</span>
          <span className="current-desk-date">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        <div className="header-brand-line">
          <div className="brand-logo-container" onClick={handleBackToFeed}>
            {/* SEO VALUE: Structural descriptive tag hierarchy for primary site navigation vectors */}
            <h1 className="brand-logo-text">THE PUBLIC WIRE</h1>
            <p className="brand-tagline">Real-time news desk & live database record broadcast sync</p>
          </div>
          
          <div className="header-control-box">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="lang-toggle-button"
              aria-label="Toggle language edition"
            >
              {lang === 'en' ? 'हिन्दी संस्करण (HI)' : 'English Version (EN)'}
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC TOP LEADERBOARD SLOT (Uses Option 1: Programmatic Display Array) */}
      <div className="ad-wrapper-container ad-leaderboard-top" aria-hidden="true">
        <div style={{ width: '100%' }}>
          <span className="ad-label">Advertisement Slot (Top Banner Style)</span>
          <FlexibleAdComponent zoneId="top" defaultLabel="Responsive Leaderboard Banner Adsense Unit" />
        </div>
      </div>

      {/* METRIC CATEGORY FILTER MENU */}
      {!selectedArticle && (
        <nav className="portal-navigation-bar" role="navigation" aria-label="Category Navigation">
          <button 
            onClick={() => setCurrentTab('HOMEFEED')}
            className={`nav-tab-item ${currentTab === 'HOMEFEED' ? 'tab-active' : ''}`}
          >
            All Stories (Homefeed)
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCurrentTab(cat.name)}
              className={`nav-tab-item ${currentTab === cat.name ? 'tab-active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}

      {/* FULL EXPANDED ARTICLE VIEW */}
      {selectedArticle ? (
        <main id="main-content" role="main">
          <article className="full-article-page" lang={lang}>
            <div className="article-navigation-back">
              <button onClick={handleBackToFeed} className="btn-back-wire">
                ← Return to Main Wire Feed
              </button>
            </div>

            <header className="article-story-header">
              <div className="story-meta-row">
                <span className="story-category-flag">{selectedArticle.category}</span>
                <span className="story-time-stamp">
                  Published <time dateTime={selectedArticle.createdAt || selectedArticle.createdDate}>{formatArticleDate(selectedArticle.createdAt || selectedArticle.createdDate)}</time>
                </span>
              </div>

              {/* SEO MAXIMIZATION: H2 Contextual Engine parsing for individual news structures */}
              <h2 className="story-headline">
                {lang === 'en' ? selectedArticle.titleEn : selectedArticle.titleHi}
              </h2>

              <div className="story-byline-distribution-block">
                <div className="story-byline-block">
                  Filed by correspondent: <span className="author-handle">@{selectedArticle.authorUsername}</span>
                </div>
                
                <div className="article-share-hud">
                  <span className="share-hud-label"><Share2 size={13} /> Share Story:</span>
                  <div className="share-icon-links-row">
                    <a href={getShareLinks(selectedArticle).whatsapp} target="_blank" rel="noopener noreferrer" className="share-bubble wa" title="Share on WhatsApp">
                      <Send size={14} style={{ transform: 'rotate(-20deg)' }} />
                    </a>
                    <a href={getShareLinks(selectedArticle).twitter} target="_blank" rel="noopener noreferrer" className="share-bubble tw" title="Share on X">
                      <XIcon />
                    </a>
                    <a href={getShareLinks(selectedArticle).facebook} target="_blank" rel="noopener noreferrer" className="share-bubble fb" title="Share on Facebook">
                      <FacebookIcon size={14} />
                    </a>
                    <a href={getShareLinks(selectedArticle).instagram} target="_blank" rel="noopener noreferrer" className="share-bubble ig" title="Visit Instagram">
                      <InstagramIcon size={14} />
                    </a>
                    <a href={getShareLinks(selectedArticle).youtube} target="_blank" rel="noopener noreferrer" className="share-bubble yt" title="Visit YouTube">
                      <YoutubeIcon size={14} />
                    </a>
                    <button 
                      onClick={() => copyToClipboard(getShareLinks(selectedArticle).rawUrl, selectedArticle.id || selectedArticle._id)} 
                      className="share-bubble copy-link" 
                      title="Copy Article Link"
                    >
                      {copiedId === (selectedArticle.id || selectedArticle._id) ? <Check size={14} style={{ color: '#2f855a' }} /> : <Link2 size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {selectedArticle.imageUrl && (
              <div className="story-media-showcase">
                {displayAllImageSources(selectedArticle.imageUrl).map((imgUrl, i) => (
                  <figure key={i} className="story-figure">
                    <img src={imgUrl} alt={lang === 'en' ? selectedArticle.titleEn : selectedArticle.titleHi} className="story-main-img" />
                  </figure>
                ))}
              </div>
            )}

            <div className="story-body-content">
              <p className="story-paragraph">
                {lang === 'en' ? selectedArticle.contentEn : selectedArticle.contentHi}
              </p>
            </div>

            {/* DYNAMIC MID-CONTENT EXCLUSIVE READING AD (Uses Option 2: Image Banner Style) */}
            <div className="ad-wrapper-container ad-in-feed-banner" aria-hidden="true" style={{ marginTop: '40px' }}>
              <div style={{ width: '100%' }}>
                <span className="ad-label">Advertisement Slot (In-Feed Style)</span>
                <FlexibleAdComponent zoneId="feed" defaultLabel="In-Article Banner Content Block" />
              </div>
            </div>
          </article>
        </main>
      ) : (
        /* HOME DISPATCH INDEX CORE ARCHIVE TIMELINE GRID */
        <main id="main-content" role="main" className="news-portal-editorial-layout">
          
          <section className="public-news-section news-portal-main-column" aria-label="Latest Stories Feed">
            {currentTab !== 'HOMEFEED' && (
              <div className="section-alert-banner">
                Viewing Section: <span className="highlight-tag">{currentTab}</span> — {filteredArticles.length} active publications compiled
              </div>
            )}
            
            <div>
              {filteredArticles.length === 0 ? (
                <div className="empty-wire-placeholder">
                  <p>No active publications found under this specific navigation context.</p>
                </div>
              ) : (
                <div className="news-feed-rows">
                  {filteredArticles.map((item, index) => {
                    const singleImage = displaySingleImageSource(item.imageUrl);
                    const currentTitle = lang === 'en' ? item.titleEn : item.titleHi;
                    const currentContent = lang === 'en' ? item.contentEn : item.contentHi;
                    const displayTime = formatArticleDate(item.createdAt || item.createdDate);
                    const itemId = item.id || item._id;
                    const itemShareLinks = getShareLinks(item);
                    
                    const isLeadStory = index === 0 && currentTab === 'HOMEFEED';

                    return (
                      <React.Fragment key={itemId}>
                        <article className={`portal-news-row-item ${isLeadStory ? 'lead-editorial-story' : ''}`}>
                          {singleImage && (
                            <div className="row-image-container" onClick={() => handleSelectArticleWithTracking(item)}>
                              <img src={singleImage} alt={currentTitle} className="row-image" />
                            </div>
                          )}
                          
                          <div className="row-text-content">
                            <div className="row-meta-bar">
                              <span className="row-category">{item.category}</span>
                              <span className="row-dot-divider">•</span>
                              <span className="row-time">
                                <time dateTime={item.createdAt || item.createdDate}>{displayTime}</time>
                              </span>
                            </div>

                            {/* SEO VALUE: H3 tags for index cards provide balanced thematic weight */}
                            <h3 className="row-title-headline" onClick={() => handleSelectArticleWithTracking(item)}>
                              {currentTitle}
                            </h3>

                            <p className="row-snippet-summary">
                              {getShortSnippet(currentContent, isLeadStory ? 240 : 140)}
                            </p>

                            <div className="row-footer-line">
                              <span className="row-author">By {item.authorUsername}</span>
                              
                              <div className="row-item-share-dock">
                                <a href={itemShareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="feed-share-icon wa" title="Share via WhatsApp">
                                  <Send size={12} style={{ transform: 'rotate(-20deg)' }} />
                                </a>
                                <a href={itemShareLinks.twitter} target="_blank" rel="noopener noreferrer" className="feed-share-icon tw" title="Share via X">
                                  <XIcon />
                                </a>
                                <a href={itemShareLinks.facebook} target="_blank" rel="noopener noreferrer" className="feed-share-icon fb" title="Share via Facebook">
                                  <FacebookIcon size={12} />
                                </a>
                                <a href={itemShareLinks.instagram} target="_blank" rel="noopener noreferrer" className="feed-share-icon ig" title="Visit Instagram">
                                  <InstagramIcon size={12} />
                                </a>
                                <a href={itemShareLinks.youtube} target="_blank" rel="noopener noreferrer" className="feed-share-icon yt" title="Visit YouTube">
                                  <YoutubeIcon size={12} />
                                </a>
                                <button 
                                  onClick={() => copyToClipboard(itemShareLinks.rawUrl, itemId)} 
                                  className="feed-share-icon copy" 
                                  title="Copy URL Link"
                                >
                                  {copiedId === itemId ? <Check size={11} style={{ color: '#2f855a' }} /> : <Link2 size={12} />}
                                </button>
                              </div>

                              <span className="row-read-link" onClick={() => handleSelectArticleWithTracking(item)}>Read Full Story →</span>
                            </div>
                          </div>
                        </article>

                        {/* HIGH-IMPACT MIDDLE BANNER DISPATCH AD (Uses Option 2: Image Banner Style) */}
                        {isLeadStory && (
                          <div className="ad-wrapper-container ad-in-feed-banner" aria-hidden="true">
                            <div style={{ width: '100%' }}>
                              <span className="ad-label">Advertisement Slot (Mid-Feed Style)</span>
                              <FlexibleAdComponent zoneId="feed" defaultLabel="Native Inline Banner Placement" />
                            </div>
                          </div>
                        )}

                        {/* AUTOMATIC AD INJECTION POINT: Renders after every 6 articles */}
                        {(index + 1) % 6 === 0 && (
                          <div className="ad-wrapper-container ad-in-feed-banner automatic-feed-ad" aria-hidden="true" style={{ margin: '20px 0' }}>
                            <div style={{ width: '100%' }}>
                              <span className="ad-label">Sponsored Content (Auto-Injected)</span>
                              <FlexibleAdComponent zoneId="feed" defaultLabel={`Automated Ad Slot Placement - Unit ${Math.floor((index + 1) / 6)}`} />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* RIGHT SIDE: SIDEBAR */}
          <aside className="news-portal-sidebar-column" aria-label="Editorial Sidebar">
            <div className="sidebar-sticky-wrapper">
              
              <div className="sidebar-widget-card">
                <h4 className="sidebar-widget-title">Trending Desk</h4>
                <p style={{ fontSize: '13px', color: '#4a5568', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                  Stay tuned for real-time localized news, ground reports, and deep-dive public wire broadcasts.
                </p>
              </div>

              {/* DYNAMIC SIDEBAR MULTI-MEDIA CONTAINER (Uses Option 3: Square Video Player Block) */}
              <div className="ad-wrapper-container ad-sidebar-square" aria-hidden="true">
                <div style={{ width: '100%' }}>
                  <span className="ad-label">Advertisement Slot (Square Video Style)</span>
                  <FlexibleAdComponent zoneId="sidebar" defaultLabel="Premium Square Outstream Video Ad Slot" />
                </div>
              </div>

            </div>
          </aside>

        </main>
      )}

      {/* CONSOLE OPERATIONS BOARD */}
      {session && (
        <div className="protected-staff-zone">
          <div className="zone-header-separator">
            <h2 className="zone-title">
              Internal Operations Desk 
              <span className="zone-badge">
                {session.role} WORKSPACE
              </span>
            </h2>
          </div>
          <StaffWorkspace session={session} onArticleCreated={triggerGlobalRefresh} refreshToggle={refreshToggle} />
          {/* UPDATED: Allows both ADMIN and EDITOR roles to mount and access the AdminDashboard tier */}
          {(session.role === 'ADMIN' || session.role === 'EDITOR') && (
            <div className="admin-dashboard-dock">
              <AdminDashboard session={session} onArticleDeleted={triggerGlobalRefresh} refreshTrigger={refreshToggle} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}