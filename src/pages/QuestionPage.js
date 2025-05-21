import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/QuestionPage.css";

function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/question/${id}`).then((res) => {
      setQuestion(res.data);
    });
  }, [id]);

  const handleSubmit = async () => {
    if (!selected) return alert("정답을 선택하세요!");

    const isCorrect = question.answer === selected ? "1" : "0";

    const payload = {
      문항id: question.id,
      문항유형id: question.문항유형id,
      기술도감id: question.기술도감id,
      직군id: question.직군id,
      분야id: question.분야id,
      회원id: JSON.parse(localStorage.getItem("user")).회원id,
      회원기술도감id: "HT1234", // 추후 실제 값 연결
      정답여부: isCorrect,
    };

    try {
      await axios.post("http://localhost:5000/submit-answer", payload);
      alert(isCorrect === "1" ? "정답입니다!" : "오답입니다.");
    } catch (err) {
      console.error("답안 저장 오류:", err);
    }
  };

  if (!question) return <div className="loading">문제를 불러오는 중...</div>;

  return (
    <div className="question-container">
      <h2 className="question-title">문제</h2> {/* 문항 ID 제거됨 */}
      <p className="question-content">{question.content}</p>
      <ul className="options-list">
        {question.options.map((opt, idx) => (
          <li key={idx} className="option-item">
            <label>
              <input
                type="radio"
                name="answer"
                value={idx + 1}
                checked={selected === idx + 1}
                onChange={() => setSelected(idx + 1)}
              />
              <span className="option-label">{`${idx + 1}.`}</span> {opt}
            </label>
          </li>
        ))}
      </ul>
      <button className="submit-btn" onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
}

export default QuestionPage;
