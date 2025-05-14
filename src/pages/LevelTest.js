import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/LevelTest.css";

const LevelTest = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/questions");
        const questionIds = res.data;

        const detailedQuestions = await Promise.all(
          questionIds.map(async (id) => {
            const response = await axios.get(
              `http://localhost:5000/question/${id}`
            );
            return response.data;
          })
        );
        setQuestions(detailedQuestions);
        setFilteredQuestions(detailedQuestions);
      } catch (err) {
        console.error("문항 목록 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Filter questions based on difficulty and search query
  useEffect(() => {
    let filtered = questions;

    if (difficultyFilter) {
      filtered = filtered.filter((q) => q.difficulty === difficultyFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [difficultyFilter, searchQuery, questions]);

  const handleSubmit = async () => {
    if (!userAnswer) {
      setResult("답변을 선택해주세요.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/check-answer", {
        questionId: selectedQuestion.id,
        userAnswer,
      });

      setResult(res.data.message);
    } catch (err) {
      console.error("에러 발생:", err);
      setResult("서버 오류");
    }
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setUserAnswer("");
    setResult(null);
  };

  const handleBackToList = () => {
    setSelectedQuestion(null);
    setUserAnswer("");
    setResult(null);
  };

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="level-test-container">
      <div className="main-content">
        {/* Header with filters */}
        <header className="header">
          <h1>DevInsight 실무 지식 테스트</h1>
          <div className="filters">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">모든 난이도</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
              <option value="Ruby">Ruby</option>
            </select>
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Table view or Question view */}
        {selectedQuestion ? (
          <section className="question-section">
            <button className="back-button" onClick={handleBackToList}>
              목록으로 돌아가기
            </button>
            <div className="question-header">
              <h2>{selectedQuestion.id}</h2>
              <div className="question-meta">
                <span>유형: {selectedQuestion.type}</span>
                <span>난이도: {selectedQuestion.difficulty}</span>
              </div>
            </div>
            <h3>{selectedQuestion.content}</h3>
            <table className="options-table">
              <tbody>
                {selectedQuestion.options.map((option, index) => (
                  <tr
                    key={index}
                    className={
                      userAnswer === (index + 1).toString() ? "selected" : ""
                    }
                    onClick={() => setUserAnswer((index + 1).toString())}
                  >
                    <td>{index + 1}</td>
                    <td>{option}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footer">
              {result && <p className="result">{result}</p>}
              <button className="submit-button" onClick={handleSubmit}>
                제출하기
              </button>
            </div>
          </section>
        ) : (
          <section className="question-list">
            <table className="questions-table">
              <thead>
                <tr>
                  <th>문항 ID</th>
                  <th>문항 내용</th>
                  <th>난이도</th>
                  <th>문제 유형</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => handleQuestionSelect(q)}
                    className="clickable"
                  >
                    <td>{q.id}</td>
                    <td>{q.content}</td>
                    <td>{q.difficulty}</td>
                    <td>{q.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default LevelTest;
