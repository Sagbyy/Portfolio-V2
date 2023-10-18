import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/main.scss';
import Home from './pages/Home';
import AdminLogin from './pages/Admin_Login';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminLogin />} />
            </Routes>
        </Router>
    </React.StrictMode>,
);
