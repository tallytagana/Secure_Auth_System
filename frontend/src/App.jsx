import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDetails from './pages/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <div className="bg-orb" style={{ width: '400px', height: '400px', top: '-10%', left: '-10%', background: 'var(--primary)' }}></div>
            <div className="bg-orb" style={{ width: '300px', height: '300px', bottom: '10%', right: '10%', background: 'var(--accent)', animationDelay: '-5s' }}></div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/details"
                        element={
                            <ProtectedRoute>
                                <UserDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
