import React, { useEffect, useState } from "react";
import "../css/Library.css";

const Library = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseCSV = (csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row = {};
      headers.forEach((h, i) => {
        row[h] = values[i] || "";
      });
      return row;
    });
  };

  useEffect(() => {
    fetch("/기술도감id.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV(text);
        const uniqueCategories = [
          ...new Set(parsed.map((row) => row["분야"] || row["직군"])),
        ].filter(Boolean);
        setData(parsed);
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("CSV 파일을 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  // 선택된 항목 기준으로 드롭다운 옵션 필터링
  const getFilteredValues = (key) => {
    return [
      ...new Set(
        data
          .filter((row) => {
            return (
              (!selectedCategory ||
                row["분야"] === selectedCategory ||
                row["직군"] === selectedCategory) &&
              (!selectedLanguage ||
                row["언어"] === selectedLanguage ||
                key === "언어") &&
              (!selectedFramework ||
                row["프레임워크"] === selectedFramework ||
                key === "프레임워크") &&
              (!selectedLibrary ||
                row["라이브러리"] === selectedLibrary ||
                key === "라이브러리")
            );
          })
          .map((row) => row[key])
          .filter(Boolean)
      ),
    ];
  };

  // 필터링된 테이블 데이터
  const filteredData = data.filter((row) => {
    return (
      (!selectedCategory ||
        row["분야"] === selectedCategory ||
        row["직군"] === selectedCategory) &&
      (!selectedLanguage || row["언어"] === selectedLanguage) &&
      (!selectedFramework || row["프레임워크"] === selectedFramework) &&
      (!selectedLibrary || row["라이브러리"] === selectedLibrary)
    );
  });

  if (loading) return <p className="loading-text">로딩 중...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="library-container">
      <h1>직군별 기술 도감</h1>

      {/* 분야 선택 버튼 */}
      <div className="category-selector">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 드롭다운 필터 */}
      <div className="dropdown-container">
        <select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setSelectedFramework(""); // 연쇄 초기화
            setSelectedLibrary("");
          }}
        >
          <option value="">언어 전체</option>
          {getFilteredValues("언어").map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select
          value={selectedFramework}
          onChange={(e) => {
            setSelectedFramework(e.target.value);
            setSelectedLibrary(""); // 연쇄 초기화
          }}
        >
          <option value="">프레임워크 전체</option>
          {getFilteredValues("프레임워크").map((fw) => (
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
          {getFilteredValues("라이브러리").map((lib) => (
            <option key={lib} value={lib}>
              {lib}
            </option>
          ))}
        </select>
      </div>

      {/* 테이블 */}
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
                <td>{row["언어"]}</td>
                <td>{row["프레임워크"]}</td>
                <td>{row["라이브러리"]}</td>
                <td>
                  {row["라이브러리 url"] ? (
                    <a
                      href={row["라이브러리 url"]}
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
