'use client';

import { useParams } from "next/navigation";
import React from "react";
import quizzes from "@/app/data/quizzes";

export default function QuizQuestionsPage() {
    const { quizId } = useParams();
    const quiz = quizzes[quizId]; // quizに応じて選択
    
    return (
        <main>
            <h1>{quiz.title}</h1>
            <section>
                <p>{quiz.description}</p>
                <ol>
                    {quiz.answers.map((q) => (
                        <li key={q.number}>
                          <input type="text"
                                 id={`answer-${q.number}`}
                                 placeholder={`(${q.number})`} />  
                        </li>
                    ))}
                </ol>
            </section>
        </main>
    );
}