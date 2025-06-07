import quiz from "../components/styles/QuizListTable.module.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizListTable({ quizList, onSubmitQuiz, setQuizList }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        // ローカルストレージから初期データを読み込む
        const storedData = localStorage.getItem("quizList");
        if (storedData) {
            setQuizList(JSON.parse(storedData));
        }
    },[]);

    useEffect(() => {
        //quizListの変更をローカルストレージに保存する
        localStorage.setItem("quizList", JSON.stringify(quizList));
    },[quizList]);

    const router = useRouter();

    console.log("quizList", quizList);
    return (
      <table className={quiz.table}>
        <thead>
          <tr>
            <th className={quiz.th}>タイトル</th>
            <th className={quiz.th}>実施日</th>
            <th className={quiz.th}>ステータス</th>
            <th className={quiz.th}>操作</th>
            <th className={quiz.th}>実施</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((quizItem) => (
            <tr key={quizItem.id}>
              <td className={quiz.td}>{quizItem.title}</td>
              <td className={quiz.td}>{quizItem.resultDate || ' '}</td>
              <td className={quiz.td}>{quizItem.isSubmitted ? '提出済み' : '未実施'}</td>
              <td className={quiz.td} style={{ textAlign: 'center', position: 'relative' }}>
                <button
                    onClick={() =>
                        setOpenMenuId(openMenuId === quizItem.id ? null : quizItem.id)
                    }
                    className={quiz.iconButton}
                >
                    ≡
                </button>

                {openMenuId === quizItem.id && (
                  <div className={quiz.menuPopup}>
                    <button
                      className={quiz.menuItem}
                      onClick={() => {
                        router.push(`/quiz/${quizItem.id}/history`);
                        setOpenMenuId(null);
                      }}
                    >
                      履歴
                    </button>
                    <button
                      className={quiz.menuItem}
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
              <td className={quiz.td}>
                  <Link
                    href={`/quiz/${quizItem.id}/start`}
                    className={quiz.startButton}
                    onClick={() => {
                      const updatedQuizList = quizList.map(item =>
                        item.id === quizItem.id
                          ? { ...item, resultDate: new Date().toLocaleString(), isSubmitted: true }
                          : item
                      );
                      setQuizList(updatedQuizList);
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