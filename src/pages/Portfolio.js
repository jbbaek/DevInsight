import React from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <div>
      <h1>포트폴리오를 업로드하고 맞춤형 분석을 받아보세요 </h1>
      <p>분석시작하기</p>
      <h2>
        <Link to="/InterviewPre">면접예상 질문 리스트 받기</Link>
      </h2>
      <h2>
        <Link to="/CareerRoadmap">진로 로드맵 추천</Link>
      </h2>
    </div>
  );
};

export default Portfolio;
