'use client'

import { useState } from "react";
import styles from "./page.module.css";
import QuizListTable from "../components/QuizListTable";

export default function QuizListPage() {
    const [quizList, setQuizList] = useState([
        { id: 1, title: "第1章 小テスト", resultDate: null, isSubmitted: false },
    { id: 2, title: "第2章 小テスト", resultDate: null, isSubmitted: false },
    { id: 3, title: "第3章 小テスト", resultDate: null, isSubmitted: false }
    ]);

    const handleSubmitQuiz = (quizId) => {
        const updatedList = quizList.map(quiz => 
            quiz.id === quizId ? { ...quiz, resultDate: new Date().toLocaleString(), isSubmitted: true }
            : quiz 
        );
        setQuizList(updatedList);
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>小テスト一覧</h1>
            <QuizListTable quizList={quizList}
                           setQuizList={setQuizList}
                           onSubmitQuiz={handleSubmitQuiz} 
            />
        </main>
    );
}