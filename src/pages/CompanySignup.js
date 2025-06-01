import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/CommpanySignup.css";

const CommpanySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    기업id: "",
    비밀번호: "",
    기업명: "",
    설립연도: "",
    기업설명: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/company-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        // 결과 구조 확인(개발 중이면 콘솔에 찍어보세요)
        // console.log("result:", result);
        sessionStorage.setItem("기업id", result.user.기업id);
        sessionStorage.setItem("type", "company");
        alert("기업 회원가입 완료!");
        navigate("/companymain");
      } else {
        alert("회원가입 실패: " + (result.message || ""));
      }
    } catch (err) {
      alert("서버 연결 오류!");
    }
  };

  return (
    <div className="commpanysignup">
      <div className="signup-container">
        <h1 className="title">DevinSight</h1>
        <h2>기업 회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>기업 ID</label>
            <input
              type="text"
              name="기업id"
              value={formData.기업id}
              onChange={handleChange}
              placeholder="기업 ID"
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
            <label>기업명</label>
            <input
              type="text"
              name="기업명"
              value={formData.기업명}
              onChange={handleChange}
              placeholder="기업명"
              required
            />
          </div>
          <div className="form-group">
            <label>설립연도</label>
            <input
              type="text"
              name="설립연도"
              value={formData.설립연도}
              onChange={handleChange}
              placeholder="설립연도(예: 2010)"
            />
          </div>
          <div className="form-group">
            <label>기업설명</label>
            <textarea
              name="기업설명"
              value={formData.기업설명}
              onChange={handleChange}
              placeholder="기업설명"
              rows={3}
            />
          </div>
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#fff9e6",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            type="submit"
          >
            회원가입
          </button>
        </form>
        <div className="footer">
          <span>이미 회원이라면?</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default CommpanySignup;
