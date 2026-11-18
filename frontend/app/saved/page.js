'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SavedJobs() {
    let { user, loading } = useAuth();
    let router = useRouter();
    let [savedJobs, setSavedJobs] = useState([]);
    let [message, setMessage] = useState('');

    let fetchSavedJobs = async () => {
        let res = await fetch('http://localhost:5000/api/saved', { credentials: 'include' });
        let data = await res.json();
        if (data.success) setSavedJobs(data.data);
    };

    let handleRemove = async (jobId) => {
        let res = await fetch(`http://localhost:5000/api/saved/${jobId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        let data = await res.json();
        if (data.success) {
            setMessage('Job removed');
            fetchSavedJobs();
        }
    };

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (!loading && user) fetchSavedJobs();
    }, [user, loading]);

    if (loading) return <p style={{ color: '#aaa' }}>Loading...</p>;

    return (
        <div>
            <h1 style={{ color: '#00c896', marginBottom: '1.5rem' }}>Saved Jobs</h1>
            {message && <p style={{ color: '#00c896' }}>{message}</p>}
            {savedJobs.length === 0 ? (
                <p style={{ color: '#aaa' }}>No saved jobs yet.</p>
            ) : (
                savedJobs.map((job) => (
                    <div key={job._id} style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #333' }}>
                        <h3 style={{ color: '#fff', margin: 0 }}>{job.jobTitle}</h3>
                        <p style={{ color: '#aaa', margin: '0.5rem 0' }}>{job.companyName}</p>
                        <p style={{ color: '#666', fontSize: '0.85rem' }}>{job.jobType} — {job.jobGeo}</p>
                        <button
                            onClick={() => handleRemove(job.jobId)}
                            style={{ marginTop: '0.75rem', background: '#e74c3c', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
