import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Library.css";

const Library = () => {
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/technologies")
      .then((res) => {
        const parsed = res.data;
        setData(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  const getFilteredValues = (key) => {
    return [
      ...new Set(
        data
          .filter(
            (row) =>
              (!selectedLanguage ||
                row.language === selectedLanguage ||
                key === "language") &&
              (!selectedFramework ||
                row.framework === selectedFramework ||
                key === "framework") &&
              (!selectedLibrary ||
                row.library === selectedLibrary ||
                key === "library")
          )
          .map((row) => row[key])
          .filter(Boolean)
      ),
    ];
  };

  const filteredData = data.filter(
    (row) =>
      (!selectedLanguage || row.language === selectedLanguage) &&
      (!selectedFramework || row.framework === selectedFramework) &&
      (!selectedLibrary || row.library === selectedLibrary)
  );

  if (loading) return <p className="loading-text">로딩 중...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="library-container">
      <h1>기술도감</h1>
      <div className="dropdown-container">
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

      <div className="tech-table-container">
        <table className="tech-table">
          <thead>
            <tr>
              <th>언어</th>
              <th>프레임워크</th>
              <th>라이브러리</th>
              <th>라이브러리 URL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.language || "-"}</td>
                <td>{row.framework || "-"}</td>
                <td>{row.library || "-"}</td>
                <td>
                  {row.library_url ? (
                    <a
                      href={row.library_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      링크
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
