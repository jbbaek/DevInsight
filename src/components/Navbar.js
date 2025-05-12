import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"; // 스타일링을 위한 CSS 파일

function Navbar() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup", "/CommpanySignup"]; // 네비게이션을 숨길 경로

  // 현재 경로가 숨김 대상이면 null 반환
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

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
          <Link to="/analysis">트렌드 분석</Link>
        </li>
        <li>
          <Link to="/Portfolio">포트폴리오 분석</Link>
        </li>
        <li>
          <Link to="/Jobrecommend">직무 추천</Link>
        </li>
        <li>
          <Link to="/LevelTest">DTL</Link>
        </li>
        <li>
          <Link to="/Library">기술도감</Link>
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
