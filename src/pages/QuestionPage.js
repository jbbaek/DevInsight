import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/QuestionPage.css";

function QuestionPage({ id, setSelectedTechId, setSelectedQuestionId }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/question/${id}`).then((res) => {
      setQuestion(res.data);
    });
  }, [id]);

  const handleSelect = (selectedNumber) => {
    if (!submitted) setSelected(selectedNumber);
  };

  const handleSubmit = async () => {
    const userId =
      JSON.parse(localStorage.getItem("user"))?.회원id ||
      sessionStorage.getItem("회원id");

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (selected === null) {
      alert("답안을 선택해주세요.");
      return;
    }

    const isCorrect = question.answer === selected;
    setFeedback(isCorrect ? "정답입니다!" : "오답입니다.");
    setSubmitted(true);

    const 회원기술도감id = `HT_${userId}_${question.기술도감id}`;

    try {
      // ✅ 먼저 중복 채점 여부 확인
      const checkRes = await axios.get("http://localhost:5000/check-answer", {
        params: {
          회원id: userId,
          문항id: question.id,
        },
      });

      if (checkRes.data.exists) {
        console.log("❗ 이미 채점된 문항. 점수에는 반영되지 않음");
        return;
      }

      // ✅ 점수 기록
      const payload = {
        문항id: question.id,
        문항유형id: question.문항유형id,
        기술도감id: question.기술도감id,
        직군id: question.직군id,
        분야id: question.분야id,
        회원id: userId,
        회원기술도감id,
        정답여부: isCorrect ? "1" : "0",
      };

      await axios.post("http://localhost:5000/submit-answer", payload);
    } catch (err) {
      console.error("답안 처리 오류:", err);
    }
  };

  const handleBack = () => {
    setSelectedQuestionId(null);
  };

  if (!question) return <div className="loading">문제를 불러오는 중...</div>;

  return (
    <div>
      <button className="submit-button" onClick={handleBack}>
        ← 돌아가기
      </button>

      <div className="question-container">
        <h2 className="question-title">문항</h2>

        <p className="question-content">{question.content}</p>
        <ul className="options-list">
          {question.options.map((opt, idx) => {
            const number = idx + 1;
            const className = submitted
              ? number === question.answer
                ? "option-item correct"
                : selected === number
                ? "option-item incorrect"
                : "option-item"
              : selected === number
              ? "option-item selected"
              : "option-item";

            return (
              <li
                key={idx}
                className={className}
                onClick={() => handleSelect(number)}
              >
                {`${number}번: ${opt}`}
              </li>
            );
          })}
        </ul>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button className="submit-button" onClick={handleSubmit}>
            제출하기
          </button>
        </div>

        <p className="feedback">{feedback}</p>
      </div>
    </div>
  );
}

export default QuestionPage;
