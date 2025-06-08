import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import "../css/Mainpage.css";

const CommpanyMainpage = () => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/main-job-postings")
      .then((res) => res.json())
      .then((data) => {
        setJobPostings(data);
      })
      .catch((err) => {
        console.error("채용공고 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className="main-container">
      <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        {/* 주요 메뉴 */}
        <section className="main-icons">
          <ul>
            <p>
              <Link to="/jobPosting">
                <FontAwesomeIcon icon={faBuilding} />
              </Link>
              <div className="main-icon-label">채용공고</div>
            </p>
          </ul>
        </section>
        <section className="survey-section"></section>
        <section className="add-section">
          <Link to="/AddPost" className="add-button">
            채용공고올리기
          </Link>
        </section>

        {/* 채용공고 미리보기 */}
        <section style={{ marginTop: "40px" }}>
          <h2>현재 채용공고</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {jobPostings.map((job) => (
              <div
                key={job.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "12px",
                  width: "300px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                <h3>{job.title}</h3>
                <p>기업명: {job.company}</p>
                <p>마감일: {job.deadline}</p>
                <Link className="mainpage-button" to={`/jobPosting/${job.id}`}>
                  자세히 보기
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommpanyMainpage;
