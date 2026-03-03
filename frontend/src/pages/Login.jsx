import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const validate = () => {
        const newErrors = {};
        if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
        if (!formData.password) newErrors.password = 'Password is required.';
        return newErrors;
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate('/details');
        } catch (err) {
            setServerError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const fieldError = (field) => errors[field] ? (
        <span style={{ color: 'var(--error, #f87171)', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <AlertCircle size={13} /> {errors[field]}
        </span>
    ) : null;

    return (
        <div className="glass-card">
            <h1>Sign In</h1>
            <p className="subtitle">Securely access your account</p>

            {successMessage && <div className="success-message"><CheckCircle size={18} /> {successMessage}</div>}
            {serverError && <div className="error-message"><AlertCircle size={18} /> {serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', opacity: 0.6 }} />
                        <input
                            type="email"
                            className={`form-input${errors.email ? ' input-error' : ''}`}
                            style={{ paddingLeft: '3rem' }}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>
                    {fieldError('email')}
                </div>
                <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', opacity: 0.6 }} />
                        <input
                            type="password"
                            className={`form-input${errors.password ? ' input-error' : ''}`}
                            style={{ paddingLeft: '3rem' }}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                        />
                    </div>
                    {fieldError('password')}
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

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Don't have an account? <Link to="/register" className="text-link">Create Account</Link>
            </p>
        </div>
    );
};

export default Login;
