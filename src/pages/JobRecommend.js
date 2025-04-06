import React from "react";
import "../css/JobRecommend.css";

function JobRecommend() {
  return (
    <div className="mainpage">
      <section className="hero-section">
        <div className="hero-text">직군 추천 설문조사</div>
      </section>

      <section className="survey-result-section">
        <h2>결과를 출력하시겠습니까?</h2>
        <div className="survey-result">
          <div className="survey-text">
            <p>당신은 ... 직군을 추천합니다</p>
            <p>직무 설명.....</p>
          </div>
          <div className="survey-chart"></div>
        </div>
      </section>
    </div>
  );
}

export default JobRecommend;
