// import React, { useState, useEffect } from 'react';
// import './StaffWorkspace.css';

// // StaffWorkspace Component: Provides a bilingual wire composition desk with built-in translation and file validation pipelines.
// export default function StaffWorkspace({ session, onArticleCreated, refreshToggle }) {
//   // State elements to capture tracking inputs, translation feedback, and bilingual copy blocks
//   const [titleEn, setTitleEn] = useState('');
//   const [contentEn, setContentEn] = useState('');
//   const [titleHi, setTitleHi] = useState('');
//   const [contentHi, setContentHi] = useState('');
//   const [category, setCategory] = useState('');
  
//   const [images, setImages] = useState([]); 
//   const [linkInput, setLinkInput] = useState(''); 
//   const [imageSource, setImageSource] = useState('url'); 
//   const [message, setMessage] = useState('');
//   const [isTranslating, setIsTranslating] = useState(false);
//   const [previewUrls, setPreviewUrls] = useState([]);
  
//   const [drafts, setDrafts] = useState([]);
//   const [dbCategories, setDbCategories] = useState([]);

//   // Responsive UI Layout Calculation: Computes column distribution depending on browser sizing matrix
//   const getResponsiveGridStyle = () => ({
//     display: 'grid',
//     gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
//     gap: '24px',
//     marginBottom: '20px'
//   });

//   const [gridStyle, setGridStyle] = useState(getResponsiveGridStyle());

//   // Tracks active viewport updates to realign input blocks symmetrically
//   useEffect(() => {
//     const handleResize = () => setGridStyle(getResponsiveGridStyle());
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Syncs staging image arrays down to dedicated layout components
//   useEffect(() => {
//     setPreviewUrls(images);
//   }, [images]);

//   // Initializes workspace storage states by calling backend records on lifecycle startup
//   useEffect(() => {
//     fetchDrafts();
//   }, []);

//   // Hot-reloads categories whenever external triggers toggle state dependencies
//   useEffect(() => {
//     loadCategories();
//   }, [refreshToggle]);

//   // DATABASE INTEGRATION: Fetches active system categories to populate editorial select dropdowns
//   const loadCategories = async () => {
//     try {
//       const res = await fetch('http://localhost:9090/api/categories/all');
//       if (res.ok) {
//         const data = await res.json();
//         setDbCategories(data);
//         if (data.length > 0 && !category) {
//           setCategory(data[0].name);
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching categories from database system:', err);
//     }
//   };

//   // BACKEND API OPERATION: Pulls existing wire data using structural security layer tags
//   const fetchDrafts = async () => {
//     try {
//       const response = await fetch('http://localhost:9090/api/articles/all', {
//         headers: { 'X-User-Role': session.role }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setDrafts(data);
//       }
//     } catch (err) {
//       console.error('Error fetching articles', err);
//     }
//   };

//   // STATE CONFIGURATION: Upgrades a targeted draft entry directly into live publication status
//   const handlePublishDraft = async (article) => {
//     try {
//       const response = await fetch(`http://localhost:9090/api/articles/update-status/${article.id}`, {
//         method: 'PUT',
//         headers: { 
//           'Content-Type': 'application/json',
//           'X-User-Role': session.role 
//         },
//         body: JSON.stringify({ status: 'PUBLISHED' })
//       });
      
//       if (response.ok) {
//         alert('Article pushed live!');
//         fetchDrafts(); 
//         if (onArticleCreated) onArticleCreated();
//       } else {
//         alert('Failed to update article status.');
//       }
//     } catch (err) {
//       alert('Engine connectivity failure.');
//     }
//   };

//   // DATA LOSS PROTECTION: Asks for verification before triggering record deletions on the cluster database
//   const handleDeleteArticle = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this article?")) return;
    
//     try {
//       const response = await fetch(`http://localhost:9090/api/articles/delete/${id}`, {
//         method: 'DELETE',
//         headers: { 'X-User-Role': session.role }
//       });
      
//       if (response.ok) {
//         alert('Article deleted successfully.');
//         fetchDrafts();
//         if (onArticleCreated) onArticleCreated();
//       } else {
//         const errText = await response.text();
//         alert(`Error: ${errText}`);
//       }
//     } catch (err) {
//       alert('Connectivity failure.');
//     }
//   };

//   // TRANSLATION ENGINE PIPELINE: Partitions long blocks of prose and batches requests safely to public translation micro-engines
//   const autoTranslateText = async (text, fromLang, toLang) => {
//     if (!text.trim()) return '';
//     try {
//       const paragraphs = text.split('\n');
//       const translatedParagraphs = await Promise.all(
//         paragraphs.map(async (para) => {
//           if (!para.trim()) return '';
//           // Chunks layout arrays into character-capped boundaries to prevent API execution fault-outs
//           const chunks = para.match(/.{1,400}(?=\s|$)/g) || [para];
//           const translatedChunks = await Promise.all(
//             chunks.map(async (chunk) => {
//               if (!chunk.trim()) return '';
//               const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(chunk)}`);
//               if (!res.ok) throw new Error('API processing threshold hit');
//               const data = await res.json();
//               return data[0].map(item => item[0]).join('');
//             })
//           );
//           return translatedChunks.join('');
//         })
//       );
//       return translatedParagraphs.join('\n');
//     } catch (err) {
//       console.error('Translation workflow exception:', err);
//       alert('Translation process failed.');
//       return '';
//     }
//   };

//   // WIRE HANDLER: Translates English tracking inputs directly into Hindi components
//   const handleTranslateToHindi = async () => {
//     if (!titleEn && !contentEn) return;
//     setIsTranslating(true);
//     setMessage('Processing translation blocks to Hindi...');
//     if (titleEn) { const res = await autoTranslateText(titleEn, 'en', 'hi'); if (res) setTitleHi(res); }
//     if (contentEn) { const res = await autoTranslateText(contentEn, 'en', 'hi'); if (res) setContentHi(res); }
//     setIsTranslating(false);
//     setMessage('Translation task complete.');
//   };

//   // WIRE HANDLER: Translates Hindi fields back up into verified English narrative text copies
//   const handleTranslateToEnglish = async () => {
//     if (!titleHi && !contentHi) return;
//     setIsTranslating(true);
//     setMessage('Processing translation blocks to English...');
//     if (titleHi) { const res = await autoTranslateText(titleHi, 'hi', 'en'); if (res) setTitleEn(res); }
//     if (contentHi) { const res = await autoTranslateText(contentHi, 'hi', 'en'); if (res) setContentEn(res); }
//     setIsTranslating(false);
//     setMessage('Translation task complete.');
//   };

//   // VALIDATION MECHANISM: Tracks total array limits (Max 5) and aggregates raw multi-file byte sizing profiles (Max 10MB)
//   const handleMultipleImageUploadChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
    
//     if (images.length + files.length > 5) { 
//       alert('You can upload a maximum of 5 images in total.'); 
//       e.target.value = ''; 
//       return; 
//     }

//     const currentImagesSize = images.reduce((acc, img) => acc + img.length, 0);
//     const newFilesSize = files.reduce((acc, file) => acc + file.size, 0);
//     const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB Threshold limits
    
//     if ((currentImagesSize + newFilesSize) > MAX_TOTAL_SIZE) {
//       alert('The total size of images exceeds the 10MB limit. Please select smaller or fewer files.');
//       e.target.value = '';
//       return;
//     }

//     // Encodes local storage assets sequentially down into base64 raw textual layouts
//     const filePromises = files.map((file) => new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.readAsDataURL(file);
//     }));
    
//     const base64Results = await Promise.all(filePromises);
//     setImages(prev => [...prev, ...base64Results]);
//   };

//   // EXTERNAL ROUTING HANDLER: Extracts, filters, and maps multi-link fields using structured string delimiter targets
//   const handleLinkInputChange = (text) => {
//     setLinkInput(text);
//     if (!text.trim()) { 
//       setImages([]); 
//     } else {
//       const urls = text.split('|||').map(u => u.trim()).filter(u => u !== '');
//       if (urls.length > 5) {
//         alert('Maximum 5 image links allowed.');
//         return;
//       }
//       setImages(urls);
//     }
//   };

//   // WIRE COMPOSITION PACKAGER: Compiles bilingual field structures and forwards payload parameters down to core server databases
//   const handlePublish = async (targetStatus) => {
//     setMessage('');
//     if (!titleEn || !contentEn || !titleHi || !contentHi) {
//       alert('Please make sure both language fields are filled.');
//       return;
//     }
//     const currentCategory = category || (dbCategories.length > 0 ? dbCategories[0].name : 'General');
//     const structuredImageUrlString = images.length > 0 ? images.join('|||') : null;
//     try {
//       const response = await fetch('http://localhost:9090/api/articles/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'X-User-Role': session.role },
//         body: JSON.stringify({ 
//           titleEn, 
//           contentEn, 
//           titleHi, 
//           contentHi, 
//           category: currentCategory, 
//           imageUrl: structuredImageUrlString, 
//           status: targetStatus, 
//           authorUsername: session.username
//         })
//       });
//       if (response.ok) {
//         setMessage(`Success: Article successfully saved as [${targetStatus}]!`);
//         setTitleEn(''); setContentEn(''); setTitleHi(''); setContentHi(''); setImages([]); setLinkInput(''); setCategory(dbCategories.length > 0 ? dbCategories[0].name : '');
//         fetchDrafts();
//         if (onArticleCreated) onArticleCreated();
//       } else {
//         const errorText = await response.text();
//         setMessage(`Error: ${errorText}`);
//       }
//     } catch (err) { setMessage('Engine connectivity failure.'); }
//   };

//   return (
//     <div className="staff-workspace-box">
//       <div className="workspace-header">
//         <div className="headline-wrapper">
//           <span className="desk-badge">EDITORIAL WORKSPACE</span>
//           <h3 className="workspace-title">Journalism Composition Desk</h3>
//           <p className="workspace-subtitle">Bilingual Wire Input System — Session: {session.username}</p>
//         </div>
//         <div className="action-buttons">
//           <button type="button" className="btn-wire-tool translate-hi" onClick={handleTranslateToHindi} disabled={isTranslating}>
//             {isTranslating ? 'Processing Wire...' : 'Translate EN ➔ हिंदी'}
//           </button>
//           <button type="button" className="btn-wire-tool translate-en" onClick={handleTranslateToEnglish} disabled={isTranslating}>
//             {isTranslating ? 'Processing Wire...' : 'Translate HI ➔ English'}
//           </button>
//         </div>
//       </div>

//       {message && (
//         <div className={`msg-box ${message.startsWith('Error') ? 'msg-error' : 'msg-success'}`}>
//           <span className="msg-icon">❖</span> {message}
//         </div>
//       )}

//       {/* Grid Block: Bilingual Editorial Headlines */}
//       <div style={gridStyle}>
//         <div className="input-card-group">
//           <label className="form-label">
//             English Headline <span className="lang-tag">EN</span>
//           </label>
//           <input 
//             type="text" 
//             className="form-input text-serif" 
//             placeholder="Enter editorial title..." 
//             value={titleEn || ''} 
//             onChange={e => setTitleEn(e.target.value || '')} 
//           />
//         </div>
//         <div className="input-card-group">
//           <label className="form-label">
//             Hindi Headline (हिंदी शीर्षक) <span className="lang-tag">HI</span>
//           </label>
//           <input 
//             type="text" 
//             className="form-input text-serif" 
//             placeholder="समाचार शीर्षक दर्ज करें..." 
//             value={titleHi || ''} 
//             onChange={e => setTitleHi(e.target.value || '')} 
//           />
//         </div>
//       </div>

//       {/* Grid Block: Bilingual Narrative Copy Blocks */}
//       <div style={gridStyle}>
//         <div className="input-card-group">
//           <label className="form-label">English Copy (Body Narrative)</label>
//           <textarea 
//             rows="12" 
//             className="form-textarea text-serif" 
//             placeholder="Write official copy narrative here..." 
//             value={contentEn || ''} 
//             onChange={e => setContentEn(e.target.value || '')} 
//           ></textarea>
//         </div>
//         <div className="input-card-group">
//           <label className="form-label">Hindi Copy (विवरण)</label>
//           <textarea 
//             rows="12" 
//             className="form-textarea text-serif" 
//             placeholder="समाचार का मुख्य विवरण यहाँ लिखें..." 
//             value={contentHi || ''} 
//             onChange={e => setContentHi(e.target.value || '')} 
//           ></textarea>
//         </div>
//       </div>

//       {/* Grid Block: Categorization Parameters & Media Configuration Interfaces */}
//       <div style={gridStyle}>
//         <div className="meta-card-section">
//           <div className="meta-field">
//             <label className="form-label">Desk Category Assignment</label>
//             <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
//               {dbCategories.map((cat) => (
//                 <option key={cat.id} value={cat.name}>{cat.name.toUpperCase()}</option>
//               ))}
//               {dbCategories.length === 0 && <option value="">No categories defined</option>}
//             </select>
//           </div>
//         </div>

//         <div className="meta-card-section">
//           <div className="media-header-block">
//             <label className="form-label m-0">Media Attachments Grid</label>
//             <div className="source-toggle-group">
//               <label className={`toggle-tab ${imageSource === 'url' ? 'active' : ''}`}>
//                 <input type="radio" checked={imageSource === 'url'} onChange={() => { setImageSource('url'); setImages([]); setLinkInput(''); }} /> Web Wire Link
//               </label>
//               <label className={`toggle-tab ${imageSource === 'upload' ? 'active' : ''}`}>
//                 <input type="radio" checked={imageSource === 'upload'} onChange={() => { setImageSource('upload'); setImages([]); setLinkInput(''); }} /> Local Asset
//               </label>
//             </div>
//           </div>

//           <div className="media-input-wrapper">
//             {imageSource === 'url' ? (
//               <input 
//                 type="text" 
//                 className="form-input text-mono" 
//                 placeholder="Paste external media links separated by '|||'" 
//                 value={linkInput || ''} 
//                 onChange={e => handleLinkInputChange(e.target.value)} 
//               />
//             ) : (
//               <div className="file-input-container">
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   multiple 
//                   className="form-file-hidden" 
//                   id="news-file-upload"
//                   onChange={handleMultipleImageUploadChange} 
//                 />
//                 <label htmlFor="news-file-upload" className="file-upload-facade">
//                   Choose Photographic Assets (Max 5, &lt; 10MB)
//                 </label>
//               </div>
//             )}
//           </div>

//           {previewUrls.length > 0 && (
//             <div className="gallery-container">
//               <span className="gallery-title">Verified Desk Wire Assets ({previewUrls.length}/5):</span>
//               <div className="media-gallery">
//                 {previewUrls.map((url, idx) => (
//                   <div key={idx} className="preview-img-wrapper">
//                     <img src={url} alt="Desk Attachment" />
//                     <button type="button" className="remove-btn" onClick={() => { 
//                         const updated = images.filter((_, i) => i !== idx);
//                         setImages(updated);
//                         setLinkInput(updated.join('|||'));
//                     }}>×</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Global Composition Submission Management Actions */}
//       <div className="desk-footer-actions">
//         <button type="button" className="btn-desk btn-draft" onClick={() => handlePublish('DRAFT')}>
//           Save to Wire Drafts
//         </button>
//         {(session.role === 'EDITOR' || session.role === 'ADMIN') && (
//           <button type="button" className="btn-desk btn-publish" onClick={() => handlePublish('PUBLISHED')}>
//             Publish Live to Feed
//           </button>
//         )}
//       </div>

//       {/* Active Bureau Management Ledger View (Exclusive to designated admin/editorial roles) */}
//       {(session.role === 'EDITOR' || session.role === 'ADMIN') && drafts.length > 0 && (
//         <div className="article-list">
//           <div className="list-section-header">
//             <h4>Active Bureau News Management Ledger</h4>
//             <span className="ledger-count">{drafts.length} entries on wire</span>
//           </div>
//           <div className="ledger-table-container">
//             {drafts.map(article => (
//               <div key={article.id} className="article-item">
//                 <div className="article-meta-info">
//                   <span className={`status-badge badge-${article.status.toLowerCase()}`}>{article.status}</span>
//                   <span className="article-ledger-title">{article.titleEn}</span>
//                   <span className="article-ledger-category">[{article.category || 'General'}]</span>
//                 </div>
//                 <div className="ledger-action-row">
//                   <button onClick={() => {
//                     setTitleEn(article.titleEn);
//                     setContentEn(article.contentEn);
//                     setTitleHi(article.titleHi);
//                     setContentHi(article.contentHi);
//                     setCategory(article.category);
//                     if(article.imageUrl) {
//                         const imgArray = article.imageUrl.split('|||');
//                         setImages(imgArray);
//                         setLinkInput(article.imageUrl);
//                     }
//                   }} className="ledger-btn btn-edit">Review Copy</button>
                  
//                   {article.status === 'DRAFT' && (
//                     <button onClick={() => handlePublishDraft(article)} className="ledger-btn btn-go-live">Authorize Release</button>
//                   )}
                  
//                   <button onClick={() => handleDeleteArticle(article.id)} className="ledger-btn btn-kill">Kill Story</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from 'react';
import './StaffWorkspace.css';

// StaffWorkspace Component: Provides a bilingual wire composition desk with built-in translation and file validation pipelines.
export default function StaffWorkspace({ session, onArticleCreated, refreshToggle }) {
  // State elements to capture tracking inputs, translation feedback, and bilingual copy blocks
  const [titleEn, setTitleEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [contentHi, setContentHi] = useState('');
  const [category, setCategory] = useState('');
  
  const [images, setImages] = useState([]); 
  const [linkInput, setLinkInput] = useState(''); 
  const [imageSource, setImageSource] = useState('url'); 
  const [message, setMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  
  const [drafts, setDrafts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);

  // Responsive UI Layout Calculation: Computes column distribution depending on browser sizing matrix
  const getResponsiveGridStyle = () => ({
    display: 'grid',
    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
    gap: '24px',
    marginBottom: '20px'
  });

  const [gridStyle, setGridStyle] = useState(getResponsiveGridStyle());

  // Tracks active viewport updates to realign input blocks symmetrically
  useEffect(() => {
    const handleResize = () => setGridStyle(getResponsiveGridStyle());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Syncs staging image arrays down to dedicated layout components
  useEffect(() => {
    setPreviewUrls(images);
  }, [images]);

  // BACKEND API OPERATION: Pulls existing wire data using structural security layer tags
  const fetchDrafts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:9090/api/articles/all', {
        headers: { 'X-User-Role': session.role }
      });
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
      }
    } catch (err) {
      console.error('Error fetching articles', err);
    }
  }, [session.role]);

  // DATABASE INTEGRATION: Fetches active system categories to populate editorial select dropdowns
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:9090/api/categories/all');
      if (res.ok) {
        const data = await res.json();
        setDbCategories(data);
        if (data.length > 0 && !category) {
          setCategory(data[0].name);
        }
      }
    } catch (err) {
      console.error('Error fetching categories from database system:', err);
    }
  }, [category]);

  // Initializes workspace storage states securely by asserting clearance tiers prior to executing fetches
  useEffect(() => {
    if (session?.role === 'ADMIN' || session?.role === 'EDITOR') {
      fetchDrafts();
    }
  }, [session, fetchDrafts]);

  // Hot-reloads categories whenever external triggers toggle state dependencies
  useEffect(() => {
    loadCategories();
  }, [refreshToggle, loadCategories]);

  // STATE CONFIGURATION: Upgrades a targeted draft entry directly into live publication status
  const handlePublishDraft = async (article) => {
    try {
      const response = await fetch(`http://localhost:9090/api/articles/update-status/${article.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Role': session.role 
        },
        body: JSON.stringify({ status: 'PUBLISHED' })
      });
      
      if (response.ok) {
        alert('Article pushed live!');
        fetchDrafts(); 
        if (onArticleCreated) onArticleCreated();
      } else {
        alert('Failed to update article status.');
      }
    } catch (err) {
      alert('Engine connectivity failure.');
    }
  };

  // DATA LOSS PROTECTION: Asks for verification before triggering record deletions on the cluster database
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const response = await fetch(`http://localhost:9090/api/articles/delete/${id}`, {
        method: 'DELETE',
        headers: { 'X-User-Role': session.role }
      });
      
      if (response.ok) {
        alert('Article deleted successfully.');
        fetchDrafts();
        if (onArticleCreated) onArticleCreated();
      } else {
        const errText = await response.text();
        alert(`Error: ${errText}`);
      }
    } catch (err) {
      alert('Connectivity failure.');
    }
  };

  // TRANSLATION ENGINE PIPELINE: Partitions long blocks of prose and batches requests safely to public translation micro-engines
  const autoTranslateText = async (text, fromLang, toLang) => {
    if (!text.trim()) return '';
    try {
      const paragraphs = text.split('\n');
      const translatedParagraphs = await Promise.all(
        paragraphs.map(async (para) => {
          if (!para.trim()) return '';
          // Chunks layout arrays into character-capped boundaries to prevent API execution fault-outs
          const chunks = para.match(/.{1,400}(?=\s|$)/g) || [para];
          const translatedChunks = await Promise.all(
            chunks.map(async (chunk) => {
              if (!chunk.trim()) return '';
              const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(chunk)}`);
              if (!res.ok) throw new Error('API processing threshold hit');
              const data = await res.json();
              return data[0].map(item => item[0]).join('');
            })
          );
          return translatedChunks.join('');
        })
      );
      return translatedParagraphs.join('\n');
    } catch (err) {
      console.error('Translation workflow exception:', err);
      alert('Translation process failed.');
      return '';
    }
  };

  // WIRE HANDLER: Translates English tracking inputs directly into Hindi components
  const handleTranslateToHindi = async () => {
    if (!titleEn && !contentEn) return;
    setIsTranslating(true);
    setMessage('Processing translation blocks to Hindi...');
    if (titleEn) { const res = await autoTranslateText(titleEn, 'en', 'hi'); if (res) setTitleHi(res); }
    if (contentEn) { const res = await autoTranslateText(contentEn, 'en', 'hi'); if (res) setContentHi(res); }
    setIsTranslating(false);
    setMessage('Translation task complete.');
  };

  // WIRE HANDLER: Translates Hindi fields back up into verified English narrative text copies
  const handleTranslateToEnglish = async () => {
    if (!titleHi && !contentHi) return;
    setIsTranslating(true);
    setMessage('Processing translation blocks to English...');
    if (titleHi) { const res = await autoTranslateText(titleHi, 'hi', 'en'); if (res) setTitleEn(res); }
    if (contentHi) { const res = await autoTranslateText(contentHi, 'hi', 'en'); if (res) setContentEn(res); }
    setIsTranslating(false);
    setMessage('Translation task complete.');
  };

  // VALIDATION MECHANISM: Tracks total array limits (Max 5) and aggregates raw multi-file byte sizing profiles (Max 10MB)
  const handleMultipleImageUploadChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    if (images.length + files.length > 5) { 
      alert('You can upload a maximum of 5 images in total.'); 
      e.target.value = ''; 
      return; 
    }

    const currentImagesSize = images.reduce((acc, img) => acc + img.length, 0);
    const newFilesSize = files.reduce((acc, file) => acc + file.size, 0);
    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB Threshold limits
    
    if ((currentImagesSize + newFilesSize) > MAX_TOTAL_SIZE) {
      alert('The total size of images exceeds the 10MB limit. Please select smaller or fewer files.');
      e.target.value = '';
      return;
    }

    // Encodes local storage assets sequentially down into base64 raw textual layouts
    const filePromises = files.map((file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    }));
    
    const base64Results = await Promise.all(filePromises);
    setImages(prev => [...prev, ...base64Results]);
  };

  // EXTERNAL ROUTING HANDLER: Extracts, filters, and maps multi-link fields using structured string delimiter targets
  const handleLinkInputChange = (text) => {
    setLinkInput(text);
    if (!text.trim()) { 
      setImages([]); 
    } else {
      const urls = text.split('|||').map(u => u.trim()).filter(u => u !== '');
      if (urls.length > 5) {
        alert('Maximum 5 image links allowed.');
        return;
      }
      setImages(urls);
    }
  };

  // WIRE COMPOSITION PACKAGER: Compiles bilingual field structures and forwards payload parameters down to core server databases
  const handlePublish = async (targetStatus) => {
    setMessage('');
    if (!titleEn || !contentEn || !titleHi || !contentHi) {
      alert('Please make sure both language fields are filled.');
      return;
    }
    const currentCategory = category || (dbCategories.length > 0 ? dbCategories[0].name : 'General');
    const structuredImageUrlString = images.length > 0 ? images.join('|||') : null;
    try {
      const response = await fetch('http://localhost:9090/api/articles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Role': session.role },
        body: JSON.stringify({ 
          titleEn, 
          contentEn, 
          titleHi, 
          contentHi, 
          category: currentCategory, 
          imageUrl: structuredImageUrlString, 
          status: targetStatus, 
          authorUsername: session.username
        })
      });
      if (response.ok) {
        setMessage(`Success: Article successfully saved as [${targetStatus}]!`);
        setTitleEn(''); setContentEn(''); setTitleHi(''); setContentHi(''); setImages([]); setLinkInput(''); setCategory(dbCategories.length > 0 ? dbCategories[0].name : '');
        if (session?.role === 'ADMIN' || session?.role === 'EDITOR') {
          fetchDrafts();
        }
        if (onArticleCreated) onArticleCreated();
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (err) { setMessage('Engine connectivity failure.'); }
  };

  return (
    <div className="staff-workspace-box">
      <div className="workspace-header">
        <div className="headline-wrapper">
          <span className="desk-badge">EDITORIAL WORKSPACE</span>
          <h3 className="workspace-title">Journalism Composition Desk</h3>
          <p className="workspace-subtitle">Bilingual Wire Input System — Session: {session.username}</p>
        </div>
        <div className="action-buttons">
          <button type="button" className="btn-wire-tool translate-hi" onClick={handleTranslateToHindi} disabled={isTranslating}>
            {isTranslating ? 'Processing Wire...' : 'Translate EN ➔ हिंदी'}
          </button>
          <button type="button" className="btn-wire-tool translate-en" onClick={handleTranslateToEnglish} disabled={isTranslating}>
            {isTranslating ? 'Processing Wire...' : 'Translate HI ➔ English'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`msg-box ${message.startsWith('Error') ? 'msg-error' : 'msg-success'}`}>
          <span className="msg-icon">❖</span> {message}
        </div>
      )}

      {/* Grid Block: Bilingual Editorial Headlines */}
      <div style={gridStyle}>
        <div className="input-card-group">
          <label className="form-label">
            English Headline <span className="lang-tag">EN</span>
          </label>
          <input 
            type="text" 
            className="form-input text-serif" 
            placeholder="Enter editorial title..." 
            value={titleEn || ''} 
            onChange={e => setTitleEn(e.target.value || '')} 
          />
        </div>
        <div className="input-card-group">
          <label className="form-label">
            Hindi Headline (हिंदी शीर्षक) <span className="lang-tag">HI</span>
          </label>
          <input 
            type="text" 
            className="form-input text-serif" 
            placeholder="समाचार शीर्षक दर्ज करें..." 
            value={titleHi || ''} 
            onChange={e => setTitleHi(e.target.value || '')} 
          />
        </div>
      </div>

      {/* Grid Block: Bilingual Narrative Copy Blocks */}
      <div style={gridStyle}>
        <div className="input-card-group">
          <label className="form-label">English Copy (Body Narrative)</label>
          <textarea 
            rows="12" 
            className="form-textarea text-serif" 
            placeholder="Write official copy narrative here..." 
            value={contentEn || ''} 
            onChange={e => setContentEn(e.target.value || '')} 
          ></textarea>
        </div>
        <div className="input-card-group">
          <label className="form-label">Hindi Copy (विवरण)</label>
          <textarea 
            rows="12" 
            className="form-textarea text-serif" 
            placeholder="समाचार का मुख्य विवरण यहाँ लिखें..." 
            value={contentHi || ''} 
            onChange={e => setContentHi(e.target.value || '')} 
          ></textarea>
        </div>
      </div>

      {/* Grid Block: Categorization Parameters & Media Configuration Interfaces */}
      <div style={gridStyle}>
        <div className="meta-card-section">
          <div className="meta-field">
            <label className="form-label">Desk Category Assignment</label>
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              {dbCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name.toUpperCase()}</option>
              ))}
              {dbCategories.length === 0 && <option value="">No categories defined</option>}
            </select>
          </div>
        </div>

        <div className="meta-card-section">
          <div className="media-header-block">
            <label className="form-label m-0">Media Attachments Grid</label>
            <div className="source-toggle-group">
              <label className={`toggle-tab ${imageSource === 'url' ? 'active' : ''}`}>
                <input type="radio" checked={imageSource === 'url'} onChange={() => { setImageSource('url'); setImages([]); setLinkInput(''); }} /> Web Wire Link
              </label>
              <label className={`toggle-tab ${imageSource === 'upload' ? 'active' : ''}`}>
                <input type="radio" checked={imageSource === 'upload'} onChange={() => { setImageSource('upload'); setImages([]); setLinkInput(''); }} /> Local Asset
              </label>
            </div>
          </div>

          <div className="media-input-wrapper">
            {imageSource === 'url' ? (
              <input 
                type="text" 
                className="form-input text-mono" 
                placeholder="Paste external media links separated by '|||'" 
                value={linkInput || ''} 
                onChange={e => handleLinkInputChange(e.target.value)} 
              />
            ) : (
              <div className="file-input-container">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="form-file-hidden" 
                  id="news-file-upload"
                  onChange={handleMultipleImageUploadChange} 
                />
                <label htmlFor="news-file-upload" className="file-upload-facade">
                  Choose Photographic Assets (Max 5, &lt; 10MB)
                </label>
              </div>
            )}
          </div>

          {previewUrls.length > 0 && (
            <div className="gallery-container">
              <span className="gallery-title">Verified Desk Wire Assets ({previewUrls.length}/5):</span>
              <div className="media-gallery">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="preview-img-wrapper">
                    <img src={url} alt="Desk Attachment" />
                    <button type="button" className="remove-btn" onClick={() => { 
                        const updated = images.filter((_, i) => i !== idx);
                        setImages(updated);
                        setLinkInput(updated.join('|||'));
                    }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Composition Submission Management Actions */}
      <div className="desk-footer-actions">
        <button type="button" className="btn-desk btn-draft" onClick={() => handlePublish('DRAFT')}>
          Save to Wire Drafts
        </button>
        {(session.role === 'EDITOR' || session.role === 'ADMIN') && (
          <button type="button" className="btn-desk btn-publish" onClick={() => handlePublish('PUBLISHED')}>
            Publish Live to Feed
          </button>
        )}
      </div>

      {/* Active Bureau Management Ledger View (Exclusive to designated admin/editorial roles) */}
      {(session.role === 'EDITOR' || session.role === 'ADMIN') && drafts.length > 0 && (
        <div className="article-list">
          <div className="list-section-header">
            <h4>Active Bureau News Management Ledger</h4>
            <span className="ledger-count">{drafts.length} entries on wire</span>
          </div>
          <div className="ledger-table-container">
            {drafts.map(article => (
              <div key={article.id} className="article-item">
                <div className="article-meta-info">
                  <span className={`status-badge badge-${article.status.toLowerCase()}`}>{article.status}</span>
                  <span className="article-ledger-title">{article.titleEn}</span>
                  <span className="article-ledger-category">[{article.category || 'General'}]</span>
                </div>
                <div className="ledger-action-row">
                  <button onClick={() => {
                    setTitleEn(article.titleEn);
                    setContentEn(article.contentEn);
                    setTitleHi(article.titleHi);
                    setContentHi(article.contentHi);
                    setCategory(article.category);
                    if(article.imageUrl) {
                        const imgArray = article.imageUrl.split('|||');
                        setImages(imgArray);
                        setLinkInput(article.imageUrl);
                    }
                  }} className="ledger-btn btn-edit">Review Copy</button>
                  
                  {article.status === 'DRAFT' && (
                    <button onClick={() => handlePublishDraft(article)} className="ledger-btn btn-go-live">Authorize Release</button>
                  )}
                  
                  <button onClick={() => handleDeleteArticle(article.id)} className="ledger-btn btn-kill">Kill Story</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}