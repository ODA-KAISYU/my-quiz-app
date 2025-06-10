'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.css";

export default function RegisterPage () {
    const router = useRouter();
    const [ userId, setUserId] = useState('');
    const [ password, setPassword ] = useState('');

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[userId]) {
            alert('このユーザーIDは使われています。');
            return;
        }

    users[userId] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('登録が完了しました！ログイン画面に進みます。');
    router.push('/login');
};

return (
    <main className={styles.main}>
        <h1 className={styles.title}>新規登録</h1>
        <input className={styles.input}
               type="text"
               placeholder="ユーザーID"
               value={userId}
               onChange={(e) => setUserId(e.target.value)}
        />
        <input className={styles.input}
               type="password"
               placeholder="パスワード"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button}
                onClick={handleRegister}>
                    登録する
                </button>
    </main>
);
}