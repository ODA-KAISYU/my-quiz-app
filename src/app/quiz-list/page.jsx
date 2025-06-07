'use client'

import { useState } from "react";
import styles from "./page.module.css";
import QuizListTable from "../components/QuizListTable";

export default function QuizListPage() {
    const [quizList, setQuizList] = useState([
        { id: 1, title: "第1章 小テスト", resultDate: null, isSubmitted: false },
        { id: 2, title: "第2章 小テスト", resultDate: null, isSubmitted: false },
        { id: 3, title: "第3章 小テスト", resultDate: null, isSubmitted: false },
        { id: 4, title: "第4章 小テスト", resultDate: null, isSubmitted: false },
        { id: 5, title: "第5章 小テスト", resultDate: null, isSubmitted: false },
        { id: 6, title: "第6章 小テスト", resultDate: null, isSubmitted: false },
        { id: 7, title: "第7章 小テスト", resultDate: null, isSubmitted: false },
        { id: 8, title: "第8章 小テスト", resultDate: null, isSubmitted: false },
        { id: 9, title: "第9章 小テスト", resultDate: null, isSubmitted: false },
        { id: 10, title: "第10章 小テスト", resultDate: null, isSubmitted: false },
        { id: 11, title: "第11章 小テスト", resultDate: null, isSubmitted: false },
        { id: 12, title: "第12章 小テスト", resultDate: null, isSubmitted: false },
        { id: 13, title: "第13章 小テスト", resultDate: null, isSubmitted: false },
        { id: 14, title: "第14章 小テスト", resultDate: null, isSubmitted: false },
        { id: 15, title: "第15章 小テスト", resultDate: null, isSubmitted: false },
        { id: 16, title: "第16章 小テスト", resultDate: null, isSubmitted: false },
        { id: 17, title: "第17章 小テスト", resultDate: null, isSubmitted: false },
        { id: 18, title: "第18章 小テスト", resultDate: null, isSubmitted: false },
        { id: 19, title: "第19章 小テスト", resultDate: null, isSubmitted: false },
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