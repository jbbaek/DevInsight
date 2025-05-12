import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("로그인 시도:", { email, password, rememberMe });
    alert("로그인 기능은 아직 백엔드와 연결되지 않았습니다.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
