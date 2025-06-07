'use client';

import React, { useEffect, useState} from "react";
import { useParams } from "next/navigation";
import styles from "./QuizHistoryPage.module.css";
import { useRouter } from "next/navigation";

export default function QuizHistoryPage() {
    const { quizId } = useParams();
    const [history, setHistory ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!quizId) return; // quizId が undefined の時は何もしない

        const historyKey = `quiz-${quizId}-history`;
        const savedHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
        setHistory(savedHistory);
    }, [quizId]);

    return (
        <main className={styles.historyContainer}>
            <h1>第{quizId}章 小テスト 履歴</h1>
            {history.length === 0 ? (
                <p>履歴がありません</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index} className={styles.historyItem}>
                            <div className={styles.historyItemTitle}>
                                <span>日時: {new Date(entry.timestamp).toLocaleString()}</span>
                                <span>スコア: {entry.score} 点</span>
                            </div>
                            <strong>回答:</strong>
                            <ul className={styles.answersList}>
                                {Object.entries(entry.answers).map(([number, answer]) => (
                                    <li key={number}>
                                        ({number}) {answer}
                                    </li>
                                ))}
                            </ul>
                            
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={() => router.push("/quiz-list")}
                className={styles.homeButton}
            >
                HOME に戻る
            </button>
        </main>
    );
}
