import React, { useEffect, useState } from "react";

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
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>내 채용공고 목록</h2>
      {loading ? (
        <div>로딩 중...</div>
      ) : postings.length === 0 ? (
        <div>등록한 채용공고가 없습니다.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fff9e6" }}>
              <th style={{ padding: 10 }}>채용공고ID</th>
              <th style={{ padding: 10 }}>제목</th>
              <th style={{ padding: 10 }}>마감일</th>
              <th style={{ padding: 10 }}>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {postings.map((row) => (
              <tr
                key={row.채용공고id}
                style={{ borderBottom: "1px solid #eee", textAlign: "center" }}
              >
                <td style={{ padding: 8 }}>{row.채용공고id}</td>
                <td style={{ padding: 8 }}>{row.제목}</td>
                <td style={{ padding: 8 }}>{row.마감일}</td>
                <td style={{ padding: 8 }}>
                  <a
                    href={`/jobPosting/${row.채용공고id}`}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "5px",
                      background: "#fff9e6",
                      color: "#2d2d2d",
                      textDecoration: "none",
                      fontWeight: "bold",
                      border: "1px solid #e6d300",
                    }}
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
  );
};

export default CompanyPosting;
