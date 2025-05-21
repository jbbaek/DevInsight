import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/JobPostingDetail.css";

function JobPostingDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/jobPosting/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("채용공고 상세 오류:", err);
        setError("불러오기 실패");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>채용공고 없음</div>;

  return (
    <div className="job-detail-container">
      <h2 className="page-title">채용공고 상세</h2>

      <div className="company-section">
        <div className="company-logo">
          {job.로고url ? (
            <img src={job.로고url} alt="기업 로고" />
          ) : (
            <div className="logo-placeholder">No Logo</div>
          )}
        </div>
        <div className="company-info">
          <h3>{job.기업명}</h3>
          <p>대표자명: {job.대표자명}</p>
          <p>설립 연도: {job["설립 연도"]}</p>
          <p>총 사원 수: {job["고용보험가입 사원 수"]}</p>
          <p>
            홈페이지:{" "}
            <a href={job.홈페이지} target="_blank" rel="noreferrer">
              {job.홈페이지}
            </a>
          </p>
          <Link to={`/company/${job.기업id}`} className="more-link">
            기업 정보 자세히 보기
          </Link>
        </div>
      </div>

      <div className="job-info-section">
        <h4 className="section-title">채용 정보</h4>
        <p>
          <strong>제목:</strong> {job.제목}
        </p>
        <p>
          <strong>마감일:</strong> {job.마감일}
        </p>
        <p>
          <strong>위치:</strong> {job.위치}
        </p>
        <p>
          <strong>경력:</strong> {job.경력}
        </p>
        <p>
          <strong>학력:</strong> {job.학력}
        </p>
        <p>
          <strong>기업 소개:</strong> {job["기업 소개"]}
        </p>
        <p>
          <strong>주요업무:</strong> {job.주요업무}
        </p>
        <p>
          <strong>자격요건:</strong> {job.자격요건}
        </p>
        <p>
          <strong>우대사항:</strong> {job.우대사항}
        </p>
        <p>
          <strong>복지 및 혜택:</strong> {job["복지 및 혜택"]}
        </p>
        <p>
          <strong>채용절차:</strong> {job.채용절차}
        </p>
        <p>
          <strong>태그:</strong> {job.태그}
        </p>
        <p>
          <strong>기술스택:</strong> {job.기술스택}
        </p>
      </div>
    </div>
  );
}

export default JobPostingDetail;
