

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './QuizListPage.module.css';
import QuizListTable from '../components/QuizListTable';

export default function QuizListPage() {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    // localStorage から保存済みデータを読み込む
    const storedData = localStorage.getItem('quizList');
    if (storedData) {
      setQuizList(JSON.parse(storedData));
    } else {
      // 初期データを設定
      const initialData = [
        { id: 1, title: '第一章 小テスト', resultDate: null, isSubmitted: false },
        { id: 2, title: '第二章 小テスト', resultDate: null, isSubmitted: false },
        { id: 3, title: '第三章 小テスト', resultDate: null, isSubmitted: false }
      ];
      setQuizList(initialData);
      localStorage.setItem('quizList', JSON.stringify(initialData));
    }
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>小テスト一覧</h1>
      <QuizListTable quizList={quizList}/>
    </main>
  );
}