import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CompanyDetail.css";

function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/company/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("기업 정보 불러오기 실패:", err);
        setError("불러오기 실패");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!company) return <div>기업 정보 없음</div>;

  return (
    <div className="company-detail-container">
      <div className="company-detail-card">
        <h2 className="company-detail-title">기업 정보</h2>
        {company.로고url ? (
          <img src={company.로고url} alt="기업 로고" className="company-logo" />
        ) : (
          <div className="company-logo-placeholder">No Logo</div>
        )}
        <p>
          <strong>기업명:</strong> {company.기업명}
        </p>
        <p>
          <strong>대표자명:</strong> {company.대표자명}
        </p>
        <p>
          <strong>설립 연도:</strong> {company["설립 연도"]}
        </p>
        <p>
          <strong>기업 연차:</strong> {company["기업 연차"]}
        </p>
        <p>
          <strong>기업 설명:</strong> {company["기업 설명"]}
        </p>
        <p>
          <strong>표준산업분류:</strong> {company["표준산업분류"]}
        </p>
        <p>
          <strong>연혁:</strong> {company["연혁"]}
        </p>
        <p>
          <strong>NTS 분류:</strong> {company["NTS 분류"]}
        </p>
        <p>
          <strong>매출액:</strong> {company["매출액"]}
        </p>
        <p>
          <strong>평균연봉:</strong> {company["평균연봉"]}
        </p>
        <p>
          <strong>기업유형:</strong> {company["기업유형"]}
        </p>
        <p>
          <strong>홈페이지:</strong>{" "}
          <a href={company.홈페이지} target="_blank" rel="noreferrer">
            {company.홈페이지}
          </a>
        </p>
        <p>
          <strong>주소:</strong> {company.주소}
        </p>
        <p>
          <strong>총인원:</strong> {company["총인원"]}
        </p>
        <p>
          <strong>고용보험 가입 사원 수:</strong>{" "}
          {company["고용보험가입 사원 수"]}
        </p>
        <p>
          <strong>국민연금 가입 사원 수:</strong>{" "}
          {company["국민연금 가입 사원 수"]}
        </p>
      </div>
    </div>
  );
}

export default CompanyDetail;
