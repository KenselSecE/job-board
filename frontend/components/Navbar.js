'use client';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function NavBar() {
    let { user, logout } = useAuth();

    return (
        <nav style={{ backgroundColor: '#1a1a1a', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
            <Link href="/" style={{ color: '#00c896', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
                JobBoard
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Jobs</Link>
                {user ? (
                    <>
                        <Link href="/saved" style={{ color: '#fff', textDecoration: 'none' }}>Saved Jobs</Link>
                        <Link href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
                        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Hi, {user.name}</span>
                        <button onClick={logout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
                        <Link href="/register" style={{ background: '#00c896', color: '#000', padding: '0.4rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
