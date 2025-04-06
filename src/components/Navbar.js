import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // 스타일링을 위한 CSS 파일

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <p>Devinsight</p>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/jobPosting">채용 공고</Link>
        </li>
        <li>
          <Link to="/analysis">인기기술 분석 & 연봉 정보</Link>
        </li>
        <li>
          <Link to="/Portfolio">포트폴리오 분석</Link>
        </li>
        <li>
          <Link to="/Jobrecommend">직무 추천</Link>
        </li>
        <li>
          <Link to="/survey">설문조사</Link>
        </li>
        <li>
          <Link to="/community">커뮤니티 (Q&A)</Link>
        </li>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="/login">로그인/회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
