import styles from "./styles/QuizListTable.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizListTable({ quizList, onSubmitQuiz, setQuizList }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const router = useRouter();

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>タイトル</th>
            <th className={styles.th}>最新実施日</th>
            <th className={styles.th}>ステータス</th>
            <th className={styles.th}>操作</th>
            <th className={styles.th}>実施</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((quizItem) => (
            <tr key={quizItem.id}>
              <td className={styles.td}>{quizItem.title}</td>
              <td className={styles.td}>{quizItem.resultDate ? quizItem.resultDate : ''}</td>
              <td className={styles.td}>{quizItem.isSubmitted ? '提出済み' : '未実施'}</td>
              <td className={styles.td} style={{ textAlign: 'center', position: 'relative' }}>
                <button
                    onClick={() =>
                        setOpenMenuId(openMenuId === quizItem.id ? null : quizItem.id)
                    }
                    className={styles.iconButton}
                >
                    ≡
                </button>

                {openMenuId === quizItem.id && (
                  <div className={styles.menuPopup}>
                    <button
                      className={styles.menuItem}
                      onClick={() => {
                        router.push(`/quiz/${quizItem.id}/history`);
                        setOpenMenuId(null);
                      }}
                    >
                      履歴
                    </button>
                    <button
                      className={styles.menuItem}
                      onClick={() => {
                        router.push(`/quiz/${quizItem.id}/data`);
                        setOpenMenuId(null);
                      }}
                    >
                      データ
                    </button>
                  </div>
                )}
              </td>
              <td className={styles.td}>
                  <Link
                    href={`quiz/${quizItem.id}/questions`}
                    className={styles.startButton}
                    onClick={(e) => {
                      e.preventDefault();

                      // Delegate to parent component
                      onSubmitQuiz(quizItem.id);

                      // Navigate after allowing state update to propagate
                      setTimeout(() => {
                        router.push(`/quiz/${quizItem.id}/start`);
                      }, 0);
                    }}
                  >
                    →
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }