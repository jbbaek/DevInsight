import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
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
        if (result.type === "company") {
          sessionStorage.setItem("type", "company");
          sessionStorage.setItem("기업id", result.user.기업id);
          sessionStorage.setItem("기업명", result.user.기업명);
          sessionStorage.removeItem("회원id");
          navigate("/companymain");
        } else {
          sessionStorage.setItem("type", "user");
          sessionStorage.setItem("회원id", result.user.회원id);
          sessionStorage.setItem("이름", result.user.이름);
          sessionStorage.removeItem("기업id");
          sessionStorage.removeItem("기업명");
          navigate("/");
        }
        alert("✅ 로그인 성공!");
      } else {
        alert(`❌ 로그인 실패: ${result.message}`);
      }
    } catch (error) {
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
