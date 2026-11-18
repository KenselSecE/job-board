'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function JobCard({ job }) {
    let { user } = useAuth();
    let [message, setMessage] = useState('');
    let [applying, setApplying] = useState(false);
    let [showApplyForm, setShowApplyForm] = useState(false);
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [coverLetter, setCoverLetter] = useState('');

    let handleSave = async () => {
        if (!user) { setMessage('Please login to save jobs'); return; }
        let res = await fetch('http://localhost:5000/api/saved', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                jobId: String(job.id),
                jobTitle: job.jobTitle,
                companyName: job.companyName,
                jobType: job.jobType,
                jobGeo: job.jobGeo
            })
        });
        let data = await res.json();
        setMessage(data.message);
    };

let handleApply = async () => {
    if (!name || !email) { setMessage('Name and email are required'); return; }
    setApplying(true);
    try {
        let res = await fetch('http://localhost:5000/api/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                jobId: String(job.id),
                jobTitle: job.jobTitle,
                companyName: job.companyName,
                name, email, coverLetter
            })
        });
        let data = await res.json();
        setMessage(data.message);
        setShowApplyForm(false);
    } catch (err) {
        setMessage('Error submitting application');
        console.error(err);
    }
    setApplying(false);
};

    return (
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '1.5rem', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ color: '#fff', margin: 0 }}>{job.jobTitle}</h3>
            <p style={{ color: '#00c896', margin: 0, fontWeight: 'bold' }}>{job.companyName}</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>{job.jobType} — {job.jobGeo}</p>

            {message && <p style={{ color: '#00c896', fontSize: '0.85rem' }}>{message}</p>}

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <Link href={`/jobs/${job.id}`} style={{ background: '#333', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}>
                    View Details
                </Link>
                <button onClick={handleSave} style={{ background: '#f5a623', color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Save
                </button>
                {user && (
                    <button onClick={() => setShowApplyForm(!showApplyForm)} style={{ background: '#00c896', color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        Apply
                    </button>
                )}
            </div>

            {showApplyForm && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                    <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box' }} />
                    <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box' }} />
                    <textarea placeholder="Cover letter (optional)" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box', minHeight: '80px' }} />
                    <button onClick={handleApply} disabled={applying}
                        style={{ background: '#00c896', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            )}
        </div>
    );
}