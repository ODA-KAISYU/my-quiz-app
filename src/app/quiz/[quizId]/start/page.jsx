'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function QuizIntroPage() {
  const params = useParams();
  const [quizId, setQuizId] = useState('');

  useEffect(() => {
    if (params?.quizId) {
      setQuizId(params.quizId);
    }
  }, [params]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>第{quizId}章 小テスト</h1>
      <div className={styles.buttonRow}>
        <Link href="/quiz-list">
          <button className={styles.secondaryButton}>戻る</button>
        </Link>
        <Link href={`/quiz/${quizId}/questions`}>
          <button className={styles.button}>開始</button>
        </Link>
      </div>
    </main>
  );
}