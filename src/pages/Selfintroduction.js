import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Selfintroduction.css";

const Selfintroduction = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/selfintro-list")
      .then((res) => setList(res.data))
      .catch((err) => alert("자소서 목록 불러오기 실패"));
  }, []);

  const handleClick = (id) => {
    axios
      .get(`/api/selfintro/${id}`)
      .then((res) => setSelected(res.data))
      .catch((err) => alert("자소서 상세 불러오기 실패"));
  };

  return (
    <div className="selfintro-container">
      <h1 className="selfintro-title">합격 자소서</h1>
      <p className="selfintro-desc">합격 자소서를 참고해보세요.</p>

      {selected ? (
        <div className="selfintro-detail-card">
          <button
            className="selfintro-back-btn"
            onClick={() => setSelected(null)}
          >
            ← 목록으로
          </button>
          <div className="selfintro-detail-header">
            {selected.합격자소서_제목}
          </div>
          <div className="selfintro-detail-info">
            <b>회사명:</b> {selected.회사명} | <b>합격자 정보:</b>{" "}
            {selected.합격자정보}
          </div>
          {[...Array(22)].map((_, i) => {
            const q = selected[`문항${i + 1}`];
            const a = selected[`답변${i + 1}`];
            if (!q && !a) return null;
            return (
              <div key={i}>
                <div className="selfintro-question">
                  Q{i + 1}. {q}
                </div>
                <div className="selfintro-answer">{a}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ marginTop: 30 }}>
          <table className="selfintro-table">
            <thead>
              <tr>
                <th>회사명</th>
                <th>제목</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.합격자소서ID}>
                  <td>{item.회사명}</td>
                  <td>{item.합격자소서_제목}</td>
                  <td>
                    <button
                      className="selfintro-view-btn"
                      onClick={() => handleClick(item.합격자소서ID)}
                    >
                      보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Selfintroduction;
