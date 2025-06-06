import React, { useEffect, useState } from "react";
import "../css/CompanyPosting.css";

const CompanyPosting = () => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  // sessionStorage에서 로그인된 기업id 읽어오기
  const 기업id =
    sessionStorage.getItem("기업id") || localStorage.getItem("기업id") || "";

  useEffect(() => {
    if (!기업id) return;
    fetch(`http://localhost:5000/company-postings/${기업id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [기업id]);

  return (
    <div className="companyposting-bg">
      <div className="companyposting-wrapper">
        <h2 className="companyposting-title">내 채용공고 목록</h2>
        {loading ? (
          <div style={{ color: "#fff", textAlign: "center" }}>로딩 중...</div>
        ) : postings.length === 0 ? (
          <div style={{ color: "#fff", textAlign: "center" }}>
            등록한 채용공고가 없습니다.
          </div>
        ) : (
          <table className="companyposting-table">
            <thead>
              <tr>
                <th>채용공고ID</th>
                <th>제목</th>
                <th>마감일</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {postings.map((row) => (
                <tr key={row.채용공고id}>
                  <td>{row.채용공고id}</td>
                  <td>{row.제목}</td>
                  <td>{row.마감일}</td>
                  <td>
                    <a
                      href={`/jobPosting/${row.채용공고id}`}
                      className="companyposting-link"
                    >
                      보기
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompanyPosting;
