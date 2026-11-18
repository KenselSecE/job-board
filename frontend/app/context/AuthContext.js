'use client';
import { createContext, useContext, useState, useEffect } from 'react';

let AuthContext = createContext(null);

export function AuthProvider({ children }) {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/me', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) setUser(data.user);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    let login = async (email, password) => {
        let res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        let data = await res.json();
        if (data.success) {
            setUser(data.user);
            return { success: true };
        }
        return { success: false, message: data.message };
    };

    let logout = async () => {
        await fetch('http://localhost:5000/api/users/logout', { credentials: 'include' });
        setUser(null);
    };

    let register = async (name, email, password) => {
        let res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        });
        let data = await res.json();
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}