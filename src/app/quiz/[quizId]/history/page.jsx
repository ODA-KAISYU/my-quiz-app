'use client';

import React, { useEffect, useState} from "react";
import { useParams } from "next/navigation";
import styles from "./QuizHistoryPage.module.css";
import { useRouter } from "next/navigation";
import quizzes from "@/app/data/quizzes"; // quizzes/index.js からインポートする形に変更

export default function QuizHistoryPage() {
    const { quizId } = useParams();
    const [history, setHistory ] = useState([]);
    const router = useRouter();

    const quiz = quizzes[quizId];
    if (!quiz) {
        return (
            <main className={styles.historyContainer}>
                <div className={styles.pageHeader}>
                    <h1>クイズデータが見つかりません</h1>
                </div>
                <button
                    onClick={() => router.push("/quiz-list")}
                    className={styles.homeButton}
                >
                    HOME に戻る
                </button>
            </main>
        );
    }

    useEffect(() => {
        if (!quizId) return; // quizId が undefined の時は何もしない

        const historyKey = `quiz-${quizId}-history`;
        const savedHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
        setHistory(savedHistory);
    }, [quizId]);

    return (
        <main className={styles.historyContainer}>
            <div className={styles.pageHeader}>
                <h1>第{quizId}章 小テスト 履歴</h1>
            </div>
            {history.length === 0 ? (
                <p>履歴がありません</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index} className={styles.historyItem}>
                            <div className={styles.historyItemHeader}>
                                日時: {new Date(entry.timestamp).toLocaleString()} / スコア: {entry.score} 点
                            </div>
                            <ul className={styles.answersList}>
                                {quiz.answers.map((q) => (
                                    <li key={q.number}>
                                        ({q.number}){" "}
                                        {entry.answers[q.number]?.trim()
                                            ? entry.answers[q.number]
                                            : "（未回答）"}
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
