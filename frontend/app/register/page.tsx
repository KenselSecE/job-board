'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    let { register } = useAuth();
    let router = useRouter();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let handleSubmit = async () => {
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        let result = await register(name, email, password);
        if (result.success) {
            router.push('/login');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
            <h1 style={{ color: '#00c896', marginBottom: '1.5rem' }}>Register</h1>

            {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}

            <p style={{ marginBottom: '0.25rem' }}>Name:</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box' }}
            />

            <p style={{ marginBottom: '0.25rem' }}>Email:</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box' }}
            />

            <p style={{ marginBottom: '0.25rem' }}>Password:</p>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff', boxSizing: 'border-box' }}
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: '100%', padding: '0.75rem', backgroundColor: '#00c896', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#aaa' }}>
                Already have an account? <Link href="/login" style={{ color: '#00c896' }}>Login here</Link>
            </p>
        </div>
    );
}
