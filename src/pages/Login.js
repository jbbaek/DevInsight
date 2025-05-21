import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 페이지 이동용
import "../css/Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate(); // 페이지 이동 함수

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          회원id: userId,
          비밀번호: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ 로그인 성공!");

        // localStorage 또는 sessionStorage에 로그인 정보 저장
        const userData = result.user;
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }

        // 로그인 후 페이지 이동
        navigate("/main"); // 👉 원하는 경로로 변경 가능
      } else {
        alert(`❌ 로그인 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("🚫 서버와 연결되지 않았습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">DevInsight</h1>
        <h2 className="subtitle">로그인</h2>

        <div className="form-group">
          <label>아이디</label>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>
          <button className="kakao-btn">카카오로 가입하기</button>
        </div>

        <div className="options">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            로그인 상태 유지
          </label>
          <Link to="/find-password" className="find-password">
            비밀번호 찾기
          </Link>
        </div>

        <hr />

        <div className="footer">
          <span>아직 회원이 아니라면?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
