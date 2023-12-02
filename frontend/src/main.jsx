import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.scss';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Error from './pages/Error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import LoadingProvider from './contexts/LoadingProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <LoadingProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Router>
            </LoadingProvider>
        </AuthProvider>
    </React.StrictMode>,
);
