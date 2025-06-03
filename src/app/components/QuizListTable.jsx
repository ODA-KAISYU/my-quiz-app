import quiz from "../components/styles/QuizListTable.module.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizListTable({ quizList, onSubmitQuiz, setQuizList }) {
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
              <td className={quiz.td} style={{ textAlign: 'center'}}>
                <button onClick={ () => {
                    if (!quizItem.isSubmitted) onSubmitQuiz(quizItem.id); 
                 }}
                className={quiz.iconButton}>
                ≡
                </button>
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