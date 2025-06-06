'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                fontSize: '2rem',
                marginBottom: '20px',
                color: '#1d4e9b'
            }}>
                小テストアプリ
            </h1>
            <Link href="/quiz-list">
                <button style={{
                    padding: '16px 32px',
                    backgroundColor: '#1d4e9b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#163f7a'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#1d4e9b'}>
                    小テストアプリへ
                </button>
            </Link>
        </main>
    );
}
