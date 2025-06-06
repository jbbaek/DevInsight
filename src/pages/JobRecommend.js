import React, { useState } from "react";
import jobQuestions from "../data/job_questions.json";
import "../css/JobRecommend.css";

const multiLevelOptions = [
  { label: "그렇다", value: 5 },
  { label: "", value: 4 },
  { label: "", value: 3 },
  { label: "", value: 2 },
  { label: "그렇지 않다", value: 1 },
];

const JobRecommend = () => {
  const [showTest, setShowTest] = useState(false);
  const [responses, setResponses] = useState({});

  const handleChange = (idx, value) => {
    setResponses({ ...responses, [idx]: value });
  };

  // 3번만 특별 스타일(카드형)
  const renderSpecialOptions = (q, idx) => (
    <div className="options special-options">
      {q.options.map((option, optIdx) => (
        <label
          key={optIdx}
          className="special-option-label"
          style={{
            border: "1.5px solid #A9BCD0",
            borderRadius: "20px",
            padding: "18px 32px",
            marginRight: "20px",
            marginBottom: "10px",
            fontWeight: "bold",
            background: responses[idx] === option.value ? "#DCE3EA" : "#fff",
            transition: "background 0.2s",
            cursor: "pointer",
            boxShadow:
              responses[idx] === option.value ? "0 2px 12px #dce3ea" : "none",
            fontSize: "1.15rem",
          }}
        >
          <input
            type="radio"
            name={`question-${idx}`}
            value={option.value}
            checked={responses[idx] === option.value}
            onChange={() => handleChange(idx, option.value)}
            style={{ display: "none" }}
          />
          <span className="label-text">{option.label}</span>
        </label>
      ))}
    </div>
  );

  // 나머지 5점 척도
  const renderMultiLevelOptions = (idx) => (
    <div className="options multi-level-options">
      {multiLevelOptions.map((option, optIdx) => (
        <label key={optIdx} className="option-label">
          <input
            type="radio"
            name={`question-${idx}`}
            value={option.value}
            checked={responses[idx] === option.value}
            onChange={() => handleChange(idx, option.value)}
          />
          <span
            className={`circle ${
              optIdx === 0
                ? "green"
                : optIdx === 4
                ? "purple"
                : optIdx === 2
                ? "gray"
                : ""
            }`}
          ></span>
          {option.label && <span className="label-text">{option.label}</span>}
        </label>
      ))}
    </div>
  );

  // 🔥 직무 테스트 결과 제출: 3번만 AB, 나머지는 5점척도(역할에 값 가산)
  const handleSubmit = async () => {
    const roleScores = {};

    jobQuestions.forEach((q, idx) => {
      const res = responses[idx];
      if (!res) return;

      // 3번(인덱스2)은 AB구조, 나머지는 5점 척도→역할
      if (idx === 2) {
        // AB 방식: 선택 옵션 roles에 1점 가산
        const selectedOpt = q.options.find((o) => o.value === res);
        if (selectedOpt && selectedOpt.roles) {
          selectedOpt.roles.forEach((role) => {
            roleScores[role] = (roleScores[role] || 0) + 1;
          });
        }
      } else {
        // 5점 척도: 3이상(A roles), 2이하(B roles) 각각 값만큼 가산
        const roleSet = res >= 3 ? q.options[0].roles : q.options[1].roles;
        roleSet.forEach((role) => {
          roleScores[role] = (roleScores[role] || 0) + Number(res);
        });
      }
    });

    const scores = Object.entries(roleScores).map(([분야id, 합계점수]) => ({
      분야id,
      합계점수,
    }));

    const top3 = [...scores]
      .sort((a, b) => b.합계점수 - a.합계점수)
      .slice(0, 3);

    const userId =
      localStorage.getItem("회원id") || sessionStorage.getItem("회원id");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await fetch("http://localhost:5000/submit-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, scores, top3 }),
      });
      alert("저장 성공! 마이페이지에서 결과를 확인하세요.");
      setResponses({});
      setShowTest(false);
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="JobRecommend-container">
      {!showTest ? (
        <>
          <h1>개발자 직무 성향 테스트</h1>
          <p>
            당신에게 맞는 직무를 추천해드려요. 아래 버튼을 눌러 설문을
            시작하세요.
          </p>
          <button
            onClick={() => setShowTest(true)}
            className="start-test-button"
          >
            직무 추천 받기
          </button>
        </>
      ) : (
        <>
          <h1>개발자 직무 성향 테스트</h1>
          <p>각 문항에 대해 5단계(그렇다 ~ 그렇지 않다)로 선택해주세요.</p>
          <div className="JobRecommend">
            {jobQuestions.map((q, idx) => (
              <div key={idx} className="question-block">
                <p>
                  {idx + 1}. {q.question}
                </p>
                {/* 3번(인덱스2)은 카드, 나머지는 5점 척도 */}
                {idx === 2
                  ? renderSpecialOptions(q, idx)
                  : renderMultiLevelOptions(idx)}
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="job-submit-button">
            결과 제출
          </button>
        </>
      )}
    </div>
  );
};

export default JobRecommend;
