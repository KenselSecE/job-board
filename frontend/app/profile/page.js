'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    let { user, loading, logout } = useAuth();
    let router = useRouter();
    let [applications, setApplications] = useState([]);

    let fetchApplications = async () => {
        let res = await fetch('http://localhost:5000/api/applications/my', { credentials: 'include' });
        let data = await res.json();
        if (data.success) setApplications(data.data);
    };

    let handleLogout = async () => {
        await logout();
        router.push('/');
    };

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (!loading && user) fetchApplications();
    }, [user, loading]);

    if (loading) return <p style={{ color: '#aaa' }}>Loading...</p>;

    return (
        <div>
            <h1 style={{ color: '#00c896', marginBottom: '0.5rem' }}>Profile</h1>

            {user && (
                <div style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333', marginBottom: '2rem' }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button
                        onClick={handleLogout}
                        style={{ marginTop: '1rem', background: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            )}

            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>My Applications</h2>
            {applications.length === 0 ? (
                <p style={{ color: '#aaa' }}>No applications yet.</p>
            ) : (
                applications.map((app) => (
                    <div key={app._id} style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #333' }}>
                        <h3 style={{ color: '#fff', margin: 0 }}>{app.jobTitle}</h3>
                        <p style={{ color: '#aaa', margin: '0.5rem 0' }}>{app.companyName}</p>
                        <p style={{ color: '#666', fontSize: '0.85rem' }}>Applied as: {app.name} — {app.email}</p>
                        {app.coverLetter && <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>{app.coverLetter}</p>}
                    </div>
                ))
            )}
        </div>
    );
}
