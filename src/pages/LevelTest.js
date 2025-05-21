import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/LevelTest.css";

function LevelTest() {
  const [technologies, setTechnologies] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 기술도감 로드
  useEffect(() => {
    const fetchTechnologies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/technologies");
        setTechnologies(res.data);
      } catch {
        setError("기술도감 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  // 기술 클릭 → 문항 요청
  const handleTechClick = async (techId) => {
    setSelectedTechId(techId);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/questions/${techId}`);
      setQuestions(res.data);
    } catch {
      setError("문항 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 문항 클릭 → 상세 페이지로 이동
  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="level-test-container">
      {!selectedTechId ? (
        <>
          <h1>기술도감</h1>
          <Link to="/CodingTest">코딩 테스트 하기</Link>
          <table className="technologies-table">
            <thead>
              <tr>
                <th>언어</th>
                <th>프레임워크</th>
                <th>라이브러리</th>
              </tr>
            </thead>
            <tbody>
              {technologies.map((tech) => (
                <tr key={tech.id} onClick={() => handleTechClick(tech.id)}>
                  <td>{tech.language || "-"}</td>
                  <td>{tech.framework || "-"}</td>
                  <td>{tech.library || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          {questions.length === 0 ? (
            <p>해당 기술에 연결된 문항이 없습니다.</p>
          ) : (
            <table className="questions-table">
              <thead>
                <tr>
                  <th>문항 내용</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr
                    key={q.문항id}
                    onClick={() => handleQuestionClick(q.문항id)}
                  >
                    <td>{q.문항내용}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default LevelTest;
