import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/styles.css'; // ✅ Import global styles here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
