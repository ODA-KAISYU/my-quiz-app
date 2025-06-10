'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import quizzes from "../../../data/quizzes";
import styles from './QuizQuestionsPage.module.css';

const calculateScore = (answers, correctAnswers) => {
  let score = 0;
  Object.keys(correctAnswers).forEach((number) => {
    if (answers[number]?.trim() === correctAnswers[number]?.trim()) {
      score += 1;
    }
  });
  return score;
};

export default function QuizQuestionsPage() {
  const { quizId } = useParams();
  const router = useRouter();

  const quiz = quizzes[parseInt(quizId)];
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 初期は600秒（10分）

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTime = localStorage.getItem(`quiz-${quizId}-timeLeft`);
      if (savedTime !== null) {
        setTimeLeft(parseInt(savedTime));
      }
    }
  }, [quizId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        localStorage.setItem(`quiz-${quizId}-timeLeft`, newTime.toString());
        if (newTime <= 0) {
          clearInterval(timer);
          handleSubmit();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [quizId]);

  const handleAnswerChange = (number, value) => {
    setAnswers(prev => ({ ...prev, [number]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem(`quiz-${quizId}-answers`, JSON.stringify(answers));
    localStorage.removeItem(`quiz-${quizId}-timeLeft`);

    // quiz-${quizId}-history を更新
    const historyKey = `quiz-${quizId}-history`;
    const existingHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

    const newEntry = {
        timestamp: new Date().toISOString(),
        answers: answers,
        score: calculateScore(answers, quizzes[parseInt(quizId)].correctAnswers),
    };

    existingHistory.push(newEntry);
    localStorage.setItem(historyKey, JSON.stringify(existingHistory));

    // quizList を更新
    const storedQuizList = JSON.parse(localStorage.getItem('quizList')) || [];
    const updatedQuizList = storedQuizList.map(item =>
      item.id === parseInt(quizId)
        ? {
            ...item,
            resultDate: new Date().toLocaleString(),
            isSubmitted: true,
          }
        : item
    );
    localStorage.setItem('quizList', JSON.stringify(updatedQuizList));

    router.push(`/quiz/${quizId}/result`);
  };

  if (!quiz) {
    return <p>クイズが見つかりませんでした。</p>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className={styles.main}>
      <div className={styles.title}>{quiz.title}</div>
      <p className={styles.timerCard}>
        残り：{minutes}分{seconds}秒
      </p>
      <div className={styles.description}>
        {quiz.bodies ? quiz.bodies.map((body, idx) => (
          <p key={idx}>{body}</p>
        )) : null}
      </div>
      {quiz.description.map((sectionTitle, sectionIndex) => {
        const sectionAnswerCounts = quiz.sectionAnswerCounts;
        const globalAnswerOffset = sectionAnswerCounts.slice(0, sectionIndex).reduce((sum, count) => sum + count, 0);
        const numAnswers = sectionAnswerCounts[sectionIndex];
        const localAnswerNumbers = Array.from({ length: numAnswers }, (_, i) => i + 1);

        return (
          <section key={sectionIndex} className={styles.section}>
            <h2 className={styles.sectionTitle}>{sectionIndex + 1}. {sectionTitle}</h2>
            <ol className={styles.answerList}>
              {localAnswerNumbers.map((localNumber) => {
                const globalNumber = globalAnswerOffset + localNumber;
                return (
                  <li key={globalNumber} className={styles.answerItem}>
                    <p className={styles.answerNumber}>（{localNumber}）</p>
                    <input
                      type="text"
                      className={styles.answerInput}
                      value={answers[globalNumber] || ''}
                      onChange={(e) => handleAnswerChange(globalNumber, e.target.value)}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} className={styles.endButton}>
          解答終了
        </button>
      </div>
    </main>
  );
}