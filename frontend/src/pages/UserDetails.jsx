import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, ShieldCheck } from 'lucide-react';

const UserDetails = () => {
    const { user, logout, fetchUserDetails } = useAuth();

    React.useEffect(() => {
        fetchUserDetails().catch(err => {
            console.error('Failed to fetch user details:', err);
        });
    }, []);

    if (!user) return (
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <div className="subtitle" style={{ margin: 0 }}>Deciphering user profile...</div>
        </div>
    );

    return (
        <div className="glass-card">
            <div className="profile-avatar-container">
                <div className="profile-avatar">
                    <User size={42} />
                </div>
            </div>

            <h1>User Profile</h1>
            <p className="subtitle">Securely verified identity</p>

            <div className="info-card">
                <div className="info-item">
                    <p className="info-label">Identity</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <ShieldCheck size={20} color="var(--accent)" style={{ opacity: 0.8 }} />
                        <p className="info-value">{user.firstName} {user.lastName}</p>
                    </div>
                </div>

                <div className="info-item">
                    <p className="info-label">Contact Endpoint</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Mail size={20} color="var(--primary)" style={{ opacity: 0.8 }} />
                        <p className="info-value">{user.email}</p>
                    </div>
                </div>
            </div>

            <button onClick={logout} className="btn btn-outline" style={{ color: '#fda4af' }}>
                <LogOut size={18} /> End Session
            </button>
        </div>
    );
};

export default UserDetails;
