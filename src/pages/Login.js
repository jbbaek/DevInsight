import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ 1. 입력 유효성 검사
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

      // ✅ 2. 서버 응답 JSON 파싱 (예외 처리)
      let result;
      try {
        result = await response.json();
      } catch (err) {
        alert("서버 응답이 올바르지 않습니다.");
        return;
      }

      // ✅ 3. 로그인 성공 처리
      if (response.ok) {
        alert("✅ 로그인 성공!");

        // sessionStorage에 회원id 저장
        sessionStorage.setItem("회원id", result.user.회원id);

        // 메인 페이지로 이동
        navigate("/");
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
