'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./questions.module.css";
import React from 'react';

export default function Quiz1Questions() {
  const [answers, setAnswers] = useState({});
  const { quizId } = useParams();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const [timeLeft, setTimeLeft] = useState(300);

  const handleFinish = () => {
    const confirmed = window.confirm("テストを終了しますか？");
    if (confirmed) {
      alert("テストを終了しました。");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <=1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const questions = [
    { text: "第4紀は", name: "q1", after: "と完新世とに区分される。" },
    { text: "北からは", name: "q2", after: "やヘラジカ、南からはナウマンゾウや" },
    { text: "", name: "q3", after: "などがやってきた。" },
    { text: "1949年の群馬県", name: "q4", after: `遺跡の調査により${answers.q1 || "(1)"}に堆積した` },
    { text: "", name: "q5", after: "層から打製石器が確認された。" },
    { text: () => `${answers.q1 || "(1)"}の化石人骨は、沖縄県`, name: "q6", after: "など、いずれも" },
    { text: "", name: "q7", after: "段階のものである。" },
    { text: "旧石器時代も未期になると、さらに長さ2～3センチの小形の", name: "q8", after: "があらわれ、" },
    { text: "今から約", name: "q9", after: "万年余り前になると、" },
    { text: "東日本には", name: "q10", after: "杯が広がった。" },
    { text: "シカや", name: "q11", after: "などの敏捷な動物相、" },
    { text: "小型で敏捷な動物をとらえるために", name: "q12", after: "が発明された。" },
    { text: "各地に", name: "q13", after: "が作られるようになった。" },
    { text: "漁労では", name: "q14", after: "という道具が使用された。" },
    { text: "木の伐採用には", name: "q15", after: "石がもちいられる。" },
    { text: "煮炊き用の", name: "q16", after: "も発明され、" },
    { text: "男性を表現した", name: "q17", after: "など呪術的な石器類、" },
    { text: "女性をかたどった土製品である", name: "q18", after: "も生み出された。" },
    { text: "霊威が存在するという", name: "q19", after: "と呼ばれる。" },
    { text: "成人式などと考えられている", name: "q20", after: "の風習、" },
    { text: "死者は埋葬の際に", name: "q21", after: "されることが多かった。" },
    { text: "和田峠などを産地とする", name: "q22", after: "や、" },
    { text: "奈良県二上山を産地とする", name: "q23", after: "などがある。" },
    { text: "新潟県姫川に産出する", name: "q24", after: "も広い範囲に分布している。" },
    { text: "屋根をかけた", name: "q25", after: "住居を営んで、" },
    { text: "青森県", name: "q26", after: "遺跡のように、巨大な木柱を中心部に建てる大規模な集落もみられるようになった。" },
  ];

  function QuestionItem({ item, index, answers, handleChange }) {
    return (
      <>
        {typeof item.text === "function" ? item.text() : item.text}
        <input
          className={styles.input}
          name={item.name}
          value={answers[item.name] ?? ""}
          onChange={handleChange}
          placeholder={`${index + 1}`}
        />
        {item.after}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>第{quizId}章 小テスト</h1>
      <div className={styles.question}>
        {questions.map((item, index) => (
          <QuestionItem
            key={index}
            item={item}
            index={index}
            answers={answers}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div className={styles.timer}>残り時間：{timeLeft}秒</div>
      <button className={styles.finishButton} onClick={handleFinish}>
        終了
      </button>
    </div>
  );
}