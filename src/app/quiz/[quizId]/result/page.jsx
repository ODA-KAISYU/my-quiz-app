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
                <tbody>
                    {quizzes[quizId].description.map((sectionTitle, sectionIndex) => {
                        const sectionAnswerCounts = quizzes[quizId].sectionAnswerCounts;
                        const start = sectionAnswerCounts
                            .slice(0, sectionIndex)
                            .reduce((sum, count) => sum + count, 0);
                        const end = start + sectionAnswerCounts[sectionIndex];

                        return (
                            <React.Fragment key={sectionTitle}>
                                <tr>
                                    <td colSpan="4" className={styles.sectionHeader}>
                                        {sectionTitle}
                                    </td>
                                </tr>
                                <tr>
                                    <th>番号</th>
                                    <th>自分の回答</th>
                                    <th>正解</th>
                                    <th>判定</th>
                                </tr>
                                {Array.from({ length: end - start }, (_, i) => {
                                    const number = start + i + 1;
                                    return (
                                        <tr key={number}>
                                            <td>({i + 1})</td>
                                            <td>{answers[number] || "（未回答）"}</td>
                                            <td>{quizzes[quizId].correctAnswers[number]}</td>
                                            <td>
                                                {answers[number]?.trim() === quizzes[quizId].correctAnswers[number]?.trim()
                                                    ? "正解"
                                                    : "不正解"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <div className={styles.scoreSection}>
                <div>得点</div>
                <div>
                    {score} / {Object.keys(quizzes[quizId].correctAnswers).length} 点
                    </div>
                </div>
            <button className={styles.homeButton}
                    onClick={() => router.push("/quiz-list")}>HOMEに戻る</button>
        </main>
    );
}