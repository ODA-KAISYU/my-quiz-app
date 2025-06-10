'use client';

import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function QuizIntroPage() {
  const params = useParams();
  const quizId = params?.quizId;

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.pageHeader}>
          第{quizId}章 小テスト
        </h1>
        <p className={styles.description}>準備ができたら「開始」を押してください。</p>
        <div className={styles.buttonRow}>
          <Link href="/quiz-list" className={styles.secondaryButton}>
            戻る
          </Link>
          <Link href={`/quiz/${quizId}/questions`} className={styles.button}>
            開始
          </Link>
        </div>
      </div>
    </main>
  );
}