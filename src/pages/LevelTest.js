import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuestionPage from "./QuestionPage"; // 경로는 맞게 조정해줘
import "../css/LevelTest.css";

function LevelTest() {
  const [technologies, setTechnologies] = useState([]);
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("");

  // 기술도감 불러오기
  useEffect(() => {
    const fetchTechnologies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/technologies");
        setTechnologies(res.data);
        setFilteredTechnologies(res.data);
      } catch {
        setError("기술도감 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  // 기술 필터링
  useEffect(() => {
    const filtered = technologies.filter((tech) => {
      return (
        (!selectedLanguage || tech.language === selectedLanguage) &&
        (!selectedFramework || tech.framework === selectedFramework) &&
        (!selectedLibrary || tech.library === selectedLibrary)
      );
    });
    setFilteredTechnologies(filtered);
  }, [selectedLanguage, selectedFramework, selectedLibrary, technologies]);

  // 드롭다운 필터 옵션
  const getFilteredValues = (key) => {
    return [
      ...new Set(
        technologies
          .filter((tech) => {
            if (
              key !== "language" &&
              selectedLanguage &&
              tech.language !== selectedLanguage
            )
              return false;
            if (
              key !== "framework" &&
              selectedFramework &&
              tech.framework !== selectedFramework
            )
              return false;
            if (
              key !== "library" &&
              selectedLibrary &&
              tech.library !== selectedLibrary
            )
              return false;
            return true;
          })
          .map((tech) => tech[key])
          .filter(Boolean)
      ),
    ];
  };

  const handleTechClick = async (techId) => {
    setSelectedTechId(techId);
    setSelectedQuestionId(null);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5000/questions/${techId}`);
      setQuestions(res.data);
    } catch {
      setError("문항 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestionId(questionId);
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="level-test-container">
      {selectedTechId && selectedQuestionId ? (
        <QuestionPage
          id={selectedQuestionId}
          setSelectedTechId={setSelectedTechId}
          setSelectedQuestionId={setSelectedQuestionId}
        />
      ) : selectedTechId ? (
        <>
          <button onClick={() => setSelectedTechId(null)}>← 돌아가기</button>
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
      ) : (
        <>
          <h1>DLT</h1>
          <Link to="/CodingTest" className="coding-test-link">
            코딩 테스트 하기
          </Link>

          <div className="dropdown-filters">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSelectedFramework("");
                setSelectedLibrary("");
              }}
            >
              <option value="">언어 전체</option>
              {getFilteredValues("language").map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              value={selectedFramework}
              onChange={(e) => {
                setSelectedFramework(e.target.value);
                setSelectedLibrary("");
              }}
            >
              <option value="">프레임워크 전체</option>
              {getFilteredValues("framework").map((fw) => (
                <option key={fw} value={fw}>
                  {fw}
                </option>
              ))}
            </select>

            <select
              value={selectedLibrary}
              onChange={(e) => setSelectedLibrary(e.target.value)}
            >
              <option value="">라이브러리 전체</option>
              {getFilteredValues("library").map((lib) => (
                <option key={lib} value={lib}>
                  {lib}
                </option>
              ))}
            </select>
          </div>

          <table className="technologies-table">
            <thead>
              <tr>
                <th>언어</th>
                <th>프레임워크</th>
                <th>라이브러리</th>
              </tr>
            </thead>
            <tbody>
              {filteredTechnologies.map((tech) => (
                <tr key={tech.id} onClick={() => handleTechClick(tech.id)}>
                  <td>{tech.language || "-"}</td>
                  <td>{tech.framework || "-"}</td>
                  <td>{tech.library || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default LevelTest;
