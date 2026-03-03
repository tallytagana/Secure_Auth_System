import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate('/details');
        } catch (err) {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card">
            <h1>Sign In</h1>
            <p className="subtitle">Securely access your account</p>

            {successMessage && <div className="success-message"><CheckCircle size={18} /> {successMessage}</div>}
            {error && <div className="error-message"><AlertCircle size={18} /> {error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', opacity: 0.6 }} />
                        <input
                            type="email"
                            className="form-input"
                            style={{ paddingLeft: '3rem' }}
                            placeholder="name@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', opacity: 0.6 }} />
                        <input
                            type="password"
                            className="form-input"
                            style={{ paddingLeft: '3rem' }}
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="custom-checkbox"></span>
                        <span className="checkbox-label">Remember me</span>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Authenticating...' : <><LogIn size={20} /> Sign In</>}
                </button>
            </form>

            <div className="social-divider">Or sign in with</div>
            <div className="social-buttons">
                <button className="btn btn-google">
                    Google
                </button>
                <button className="btn btn-github">
                    GitHub
                </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Don't have an account? <Link to="/register" className="text-link">Create Account</Link>
            </p>
        </div>
    );
};

export default Login;
