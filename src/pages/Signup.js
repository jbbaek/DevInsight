import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    회원id: "",
    이름: "",
    이메일: "",
    비밀번호: "",
    비밀번호확인: "",
    역할: "학생",
    이미지url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.비밀번호 !== formData.비밀번호확인) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signupData = {
      회원id: formData.회원id,
      이름: formData.이름,
      이메일: formData.이메일,
      비밀번호: formData.비밀번호,
      역할: formData.역할,
      이미지url: formData.이미지url || null,
    };

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        alert("회원가입 성공!");
        // redirect or reset
      } else {
        const result = await res.json();
        alert(`회원가입 실패: ${result.message}`);
      }
    } catch (err) {
      console.error("에러:", err);
      alert("회원가입 요청 실패");
    }
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
              name="회원id"
              value={formData.회원id}
              onChange={handleChange}
              placeholder="아이디 (10자 이내)"
              required
            />
          </div>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="이름"
              value={formData.이름}
              onChange={handleChange}
              placeholder="이름"
              required
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="이메일"
              value={formData.이메일}
              onChange={handleChange}
              placeholder="이메일 주소"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="비밀번호"
              value={formData.비밀번호}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="비밀번호확인"
              value={formData.비밀번호확인}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <div className="form-group">
            <label>역할</label>
            <select name="역할" value={formData.역할} onChange={handleChange}>
              <option value="학생">학생</option>
              <option value="취업준비생">취업준비생</option>
              <option value="직장인">직장인</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="form-group">
            <label>프로필 이미지 URL (선택)</label>
            <input
              type="text"
              name="이미지url"
              value={formData.이미지url}
              onChange={handleChange}
              placeholder="http://..."
            />
          </div>
          <div className="button-group">
            <button type="submit" className="signup-btn">
              회원가입
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
