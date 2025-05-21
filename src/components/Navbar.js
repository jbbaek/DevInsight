import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 감지
  useEffect(() => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  // 로그인/회원가입 페이지에서는 네비게이션 숨김
  const hiddenPaths = ["/login", "/signup", "/CommpanySignup"];
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
          <Link to="/LevelTest">DLT</Link>
        </li>
        <li>
          <Link to="/Library">기술도감</Link>
        </li>
        <li>
          <Link to="/community">커뮤니티 (Q&A)</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">로그인/회원가입</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
