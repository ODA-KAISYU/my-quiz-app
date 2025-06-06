'use client';

import { useParams } from "next/navigation";
import React from "react";
import quizzes from "@/app/data/quizzes";
import { useRouter } from "next/navigation";
import styles from "./QuizQuestionsPage.module.css"

export default function QuizQuestionsPage() {
    const { quizId } = useParams();
    const router = useRouter();  // ここでRouter習得

    const quiz = quizzes[quizId]; // quizに応じて選択
    
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{quiz.title}</h1>
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
                                 />  
                        </li>
                    ))}
                </ol>
            </section>
            <button
            className={styles.button}
            onClick={() => {
                router.push(`/quiz/${quizId}/result`); //ここでページ遷移
            }}
            >解答終了
            </button>
        </main>
    );
}