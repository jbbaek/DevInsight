import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userType, setUserType] = useState(
    () => sessionStorage.getItem("type") || localStorage.getItem("type") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      !!(
        sessionStorage.getItem("회원id") ||
        sessionStorage.getItem("기업id") ||
        localStorage.getItem("회원id") ||
        localStorage.getItem("기업id")
      )
  );

  useEffect(() => {
    const type =
      sessionStorage.getItem("type") || localStorage.getItem("type") || "";
    setUserType(type);

    const userId =
      sessionStorage.getItem("회원id") ||
      sessionStorage.getItem("기업id") ||
      localStorage.getItem("회원id") ||
      localStorage.getItem("기업id");
    setIsLoggedIn(!!userId);
  }, [location.pathname]);

  // 로그인/회원가입 페이지에서는 네비게이션 숨김
  const hiddenPaths = ["/login", "/signup", "/CompanySignup"];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  // 기업회원이면 기업 네비게이션
  if (userType === "company") {
    return <CompanyNavbar />;
  }

  // 회원 네비게이션
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("회원id");
    sessionStorage.removeItem("회원id");
    localStorage.removeItem("기업id");
    sessionStorage.removeItem("기업id");
    localStorage.removeItem("type");
    sessionStorage.removeItem("type");
    setIsLoggedIn(false);
    setUserType("");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

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
                  color: "#ffb7ce",
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
