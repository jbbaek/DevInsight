import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/QuestionPage.css";

function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(""); // ✅ 정답 피드백 상태

  useEffect(() => {
    axios.get(`http://localhost:5000/question/${id}`).then((res) => {
      setQuestion(res.data);
    });
  }, [id]);

  const handleSelect = (selectedNumber) => {
    setSelected(selectedNumber);

    if (!question) return;

    const isCorrect = question.answer === selectedNumber;
    setFeedback(isCorrect ? "정답입니다!" : "오답입니다.");

    const payload = {
      문항id: question.id,
      문항유형id: question.문항유형id,
      기술도감id: question.기술도감id,
      직군id: question.직군id,
      분야id: question.분야id,
      회원id: JSON.parse(localStorage.getItem("user"))?.회원id,
      회원기술도감id: "HT1234",
      정답여부: isCorrect ? "1" : "0",
    };

    axios.post("http://localhost:5000/submit-answer", payload).catch((err) => {
      console.error("답안 저장 오류:", err);
    });
  };

  if (!question) return <div className="loading">문제를 불러오는 중...</div>;

  return (
    <div className="question-container">
      <h2 className="question-title">문항</h2>
      <p className="question-content">{question.content}</p>
      <ul className="options-list">
        {question.options.map((opt, idx) => {
          const number = idx + 1;
          return (
            <li
              key={idx}
              className={`option-item ${
                selected === number
                  ? question.answer === number
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleSelect(number)}
            >
              {`${number}번: ${opt}`}
            </li>
          );
        })}
      </ul>
      <p className="feedback">{feedback}</p>
    </div>
  );
}

export default QuestionPage;
