import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faRankingStar,
  faCopy,
  faClipboardList,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Mainpage.css";

const Mainpage = () => {
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
      <div className="main-content-wrapper">
        {/* 주요 메뉴 */}
        <section className="main-icons">
          <ul>
            <p>
              <Link to="/jobPosting">
                <FontAwesomeIcon icon={faBuilding} />
              </Link>
            </p>
            <p>
              <Link to="/analysis">
                <FontAwesomeIcon icon={faRankingStar} />
              </Link>
            </p>
            <p>
              <Link to="/Portfolio">
                <FontAwesomeIcon icon={faCopy} />
              </Link>
            </p>
            <p>
              <Link to="/Jobrecommend">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </p>
            <p>
              <Link to="/Library">
                <FontAwesomeIcon icon={faClipboardList} />
              </Link>
            </p>
            <p>
              <Link to="/community">
                <FontAwesomeIcon icon={faQuestion} />
              </Link>
            </p>
          </ul>
        </section>
        <section className="survey-section">
          <Link to="/Survey" className="survey-button">
            설문조사 이동 버튼
          </Link>
        </section>

        {/* 채용공고 미리보기 */}
        <section style={{ marginTop: "40px" }}>
          <h2 className="main-job-section-title">현재 채용공고</h2>
          <div className="main-job-list">
            {jobPostings.map((job) => (
              <div className="main-job-card" key={job.id}>
                <div>
                  <div className="main-job-title">{job.title}</div>
                  <div className="main-job-company">기업명: {job.company}</div>
                  <div className="main-job-deadline">
                    마감일: {job.deadline}
                  </div>
                </div>
                <Link className="main-job-link" to={`/jobPosting/${job.id}`}>
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

export default Mainpage;
