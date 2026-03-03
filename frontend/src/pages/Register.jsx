import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData.firstName, formData.lastName, formData.email, formData.password);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card">
            <h1>Join Us</h1>
            <p className="subtitle">Create your secure account</p>

            {error && <div className="error-message"><AlertCircle size={18} /> {error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>
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
