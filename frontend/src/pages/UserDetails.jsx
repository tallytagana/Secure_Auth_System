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

    if (!user) return <div className="glass-card">Loading...</div>;

    return (
        <div className="glass-card">
            <div className="profile-avatar-container">
                <div className="profile-avatar">
                    <User size={48} color="var(--primary)" />
                </div>
            </div>

            <h1>User Profile</h1>
            <p className="subtitle">Account Information & Security</p>

            <div className="info-card">
                <div className="info-item">
                    <ShieldCheck size={24} color="var(--accent)" />
                    <div>
                        <p className="info-label">Full Name</p>
                        <p className="info-value">{user.firstName} {user.lastName}</p>
                    </div>
                </div>

                <div className="info-item">
                    <Mail size={24} color="var(--primary)" />
                    <div>
                        <p className="info-label">Email Address</p>
                        <p className="info-value">{user.email}</p>
                    </div>
                </div>
            </div>

            <button onClick={logout} className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                <LogOut size={18} /> Sign Out
            </button>
        </div>
    );
};

export default UserDetails;
