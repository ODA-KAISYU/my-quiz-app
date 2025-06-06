'use client';

import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import quizzes from "@/app/data/quizzes";
import { useRouter } from "next/navigation";
import styles from "./QuizQuestionsPage.module.css"

export default function QuizQuestionsPage() {
    const { quizId } = useParams();
    const router = useRouter();  // ここでRouter習得

    const [timeLeft, setTimeLeft] = useState(600);

    const quiz = quizzes[quizId]; // quizに応じて選択  

    const [answers, setAnswers] = useState(
        quiz.answers.reduce((acc, q) => {
            acc[q.number] = "";
            return acc;
        }, {})
    );
    
    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);




    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{quiz.title}</h1>
            <p className={styles.timer}>残り：{Math.floor(timeLeft / 60)}分 {timeLeft % 60}秒</p>
            <section>
                <p className={styles.description}>{quiz.description}</p>
                <ol className={styles.answerList}>
                    {quiz.answers.map((q) => (
                        <li key={q.number} className={styles.answerItem}>
                            <div className={styles.answerNumber}>
                                {q.number}.
                            </div>
                          <input type="text"
                                 id={`answer-${q.number}`}
                                 className={styles.answerInput}
                                 value={answers[q.number]} // ← 回答を state から取る
                                 onChange={(e) => {
                                    setAnswers({
                                        ...answers,
                                        [q.number]: e.target.value // ← 入力内容を state に保存
                                    });
                                 }}
                                 />  
                        </li>
                    ))}
                </ol>
            </section>
            <button
            className={styles.button}
            onClick={() => {
                const isConfirmed = window.confirm("本当に解答を終了しますか？");
                if (isConfirmed) {
                    localStorage.setItem(`quiz-${quizId}-answers`, JSON.stringify(answers));
                    
                    router.push(`/quiz/${quizId}/result`); //ここでページ遷移
                }
            }}
            >解答終了
            </button>
        </main>
    );
}