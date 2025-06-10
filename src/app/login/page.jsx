'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home () {
    const [ userId, setUserId ] = useState('');
    const router = useRouter ();

    const handleLogin = () => {
        if (userId.trim()) {
            localStorage.setItem('userId',userId.trim());
            router.push('/quiz-list');
        } else {
            alert('ユーザー名を入力してください')
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>小テストアプリーログイン</h1>
            <input className={styles.input}
                   type="text"
                   placeholder="ユーザーID"
                   value={userId}
                   onChange={e => setUserId(e.target.value)}
            />
            <button className={styles.button}
                    onClick={handleLogin}
                    >
            ログイン
             </button>
             <button className={styles.buttonSecondary}
                     onClick={() => router.push('/register')}>
                        新規登録
                     </button>

        </main>
    )
}