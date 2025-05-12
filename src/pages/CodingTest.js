import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "../css/CodingTest.css";

const CodingTest = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const escapeHtml = (unsafe) => {
    if (typeof unsafe !== "string") return "";
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  useEffect(() => {
    fetch("/baekjoon_problems.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("CSV 파일을 불러오지 못했습니다.");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
          transformHeader: (header) => header.trim().replace(/^"|"$/g, ""),
          transform: (value) => value.trim().replace(/^"|"$/g, ""),
          complete: (results) => {
            const cleanedData = results.data.map((row) => ({
              제목: row["제목"] || "",
              등급: row["등급"] || "",
              문제: row["문제"] || "",
              "입력 설명": row["입력 설명"] || "",
              "출력 설명": row["출력 설명"] || "",
              "예제 입력": row["예제 입력"] || "",
              "예제 출력": row["예제 출력"] || "",
              힌트: row["힌트"] || "",
            }));
            setProblems(cleanedData);
            setIsLoading(false);
          },
          error: (err) => {
            console.error("CSV 파싱 오류:", err);
            setError("CSV 데이터를 파싱하는 중 오류가 발생했습니다.");
            setIsLoading(false);
          },
        });
      })
      .catch((err) => {
        console.error("CSV 파일 불러오기 오류:", err);
        setError("CSV 파일을 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      });
  }, []);

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
  };

  const handleBackClick = () => {
    setSelectedProblem(null);
  };

  const handleDragStart = (e, problem) => {
    e.dataTransfer.setData("text/plain", problem["제목"]); // 문제 번호 대신 제목 사용
    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">문제를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  const renderProblemList = () => (
    <div className="problem-list-container">
      <h1 className="problem-list-title">코딩 테스트</h1>
      {problems.length === 0 ? (
        <p className="no-problems-text">문제가 없습니다.</p>
      ) : (
        <table className="problem-table">
          <thead>
            <tr>
              <th>등급</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr
                key={problem["제목"]}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, problem)}
                onDragEnd={handleDragEnd}
                onClick={() => handleProblemClick(problem)}
              >
                <td>{escapeHtml(problem["등급"])}</td>
                <td>{escapeHtml(problem["제목"])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderProblemDetail = () => (
    <div className="problem-detail-container">
      <div className="problem-detail-header">
        <h1 className="problem-detail-title">
          {escapeHtml(selectedProblem["제목"])}
        </h1>
        <button onClick={handleBackClick} className="back-button">
          목록으로 돌아가기
        </button>
      </div>
      <div className="problem-detail-content">
        <div className="detail-section">
          <h2 className="detail-section-title">등급</h2>
          <p className="detail-text">{escapeHtml(selectedProblem["등급"])}</p>
        </div>
        <div className="detail-section">
          <h2 className="detail-section-title">문제 설명</h2>
          <p className="detail-text">{escapeHtml(selectedProblem["문제"])}</p>
        </div>
        <div className="detail-section">
          <h2 className="detail-section-title">입력 설명</h2>
          <p className="detail-text">
            {escapeHtml(selectedProblem["입력 설명"])}
          </p>
        </div>
        <div className="detail-section">
          <h2 className="detail-section-title">출력 설명</h2>
          <p className="detail-text">
            {escapeHtml(selectedProblem["출력 설명"])}
          </p>
        </div>
        <div className="detail-section">
          <h2 className="detail-section-title">예제 입력</h2>
          <pre className="code-block">
            {escapeHtml(selectedProblem["예제 입력"])}
          </pre>
        </div>
        <div className="detail-section">
          <h2 className="detail-section-title">예제 출력</h2>
          <pre className="code-block">
            {escapeHtml(selectedProblem["예제 출력"])}
          </pre>
        </div>
        {selectedProblem["힌트"] && (
          <div className="detail-section">
            <h2 className="detail-section-title">힌트</h2>
            <p className="detail-text">{escapeHtml(selectedProblem["힌트"])}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="coding-test-container">
      {selectedProblem ? renderProblemDetail() : renderProblemList()}
    </div>
  );
};

export default CodingTest;
