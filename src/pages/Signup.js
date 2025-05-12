import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
    // 여기에 회원가입 처리 로직을 추가하세요 (예: API 호출)
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1>DevinSight</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="아이디"
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="signup-btn">
              회원가입
            </button>
            <button type="button" className="kakao-btn">
              카카오로 가입하기
            </button>
          </div>
        </form>
        <div className="signup-footer">
          <div>
            <span>이미 회원이라면?</span>
            <Link to="/login">로그인</Link>
          </div>
          <div>
            <span>기업이라면?</span>
            <Link to="/CommpanySignup">기업 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
