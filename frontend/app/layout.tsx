import { AuthProvider } from './context/AuthContext';
import NavBar from '@/components/Navbar';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'sans-serif' }}>
                <AuthProvider>
                    <NavBar />
                    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
