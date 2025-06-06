'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import quizzes from "@/app/data/quizzes";
import styles from "./ResultPage.module.css"

export default function QuizResultPage() {
    const { quizId } = useParams();
    const router = useRouter();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        const savedAnswers = localStorage.getItem(`quiz-${quizId}-answers`);
            if (savedAnswers) {
                const parsedAnswers = JSON.parse(savedAnswers);
                setAnswers(parsedAnswers);

        const quiz = quizzes[quizId];
        const correctAnswers = quiz.correctAnswers;
        let tempScore = 0;

        Object.keys(correctAnswers).forEach((number) => {
            if (
                parsedAnswers[number] &&
                parsedAnswers[number].trim() === correctAnswers[number].trim()
            ){
                tempScore += 1;
            }
        });
        setScore(tempScore);
    }
}, [quizId]);


    return  (
        <main className={styles.resultMain}>
            <h1 className={styles.questionHeader}>設問 {quizId}</h1>
            <div className={styles.questionLine}></div>

            <h2 className={styles.correctLabel}>正解</h2>
            <table className={styles.correctAnswerTable}>
                <thead>
                    <tr>
                        <th>番号</th>
                        <th>自分の回答</th>
                        <th>正解</th>
                        <th>判定</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(quizzes[quizId].correctAnswers).map((number) => (
                        <tr key={number}>
                            <td>({number})</td>
                            <td>{answers[number] || "（未回答）"}</td>
                            <td>{quizzes[quizId].correctAnswers[number]}</td>
                            <td>
                                {answers[number]?.trim() === quizzes[quizId].correctAnswers[number]?.trim()
                                    ? "正解"
                                    : "不正解"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className={styles.scoreLabel}>得点</h2>
            <p className={styles.score}>
                {score} / {Object.keys(quizzes[quizId].correctAnswers).length} 点
            </p>
            <button className={styles.homeButton}
                    onClick={() => router.push("/quiz-list")}>HOMEに戻る</button>
        </main>
    );
}