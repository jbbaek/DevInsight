// CompanyNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function CompanyNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
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
          <Link to="/AddPost">공고 올리기</Link>
        </li>
        <li>
          <Link to="/CompanyPosting">내 채용공고</Link>
        </li>
        <li>
          <Link to="/CompanyMypage">기업 마이페이지</Link>
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
      </ul>
    </nav>
  );
}

export default CompanyNavbar;
