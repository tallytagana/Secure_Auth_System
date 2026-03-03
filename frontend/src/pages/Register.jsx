import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
        if (!passwordRegex.test(formData.password)) newErrors.password = 'Password must be at least 8 characters and include a letter and a number.';
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
            await register(formData.firstName, formData.lastName, formData.email, formData.password);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err) {
            setServerError(err.response?.data || 'Registration failed. Please try again.');
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
            <h1>Sign Up</h1>
            <p className="subtitle">Create your secure account</p>

            {serverError && <div className="error-message"><AlertCircle size={18} /> {serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className={`form-input${errors.firstName ? ' input-error' : ''}`}
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                        />
                        {fieldError('firstName')}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className={`form-input${errors.lastName ? ' input-error' : ''}`}
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                        {fieldError('lastName')}
                    </div>
                </div>
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating account...' : <><UserPlus size={20} /> Create Account</>}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Already have an account? <Link to="/login" className="text-link">Log In</Link>
            </p>
        </div>
    );
};

export default Register;
