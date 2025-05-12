import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CommpanySignup.css";

const CommpanySignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    companyAddress: "",
    website: "",
    companyNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 여기에서 폼 데이터를 처리하는 로직을 추가하세요.
  };

  return (
    <div className="commpanysignup">
      <div className="signup-container">
        <h1>DevinSight</h1>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이메일 주소</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이메일"
            />
          </div>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
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
          <div className="form-group">
            <label>회사명</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="회사명"
            />
          </div>
          <div className="form-group">
            <label>담당자 이름</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="담당자 이름"
            />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(-)를 제외하고 작성하세요"
            />
          </div>
          <div className="form-group">
            <label>회사 주소</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="회사 주소"
            />
          </div>
          <div className="form-group">
            <label>홈페이지 주소</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="홈페이지 주소"
            />
          </div>
          <div className="form-group">
            <label>회사 번호</label>
            <input
              type="text"
              name="companyNumber"
              value={formData.companyNumber}
              onChange={handleChange}
              placeholder="(-)를 제외하고 작성하세요"
            />
          </div>
          <button type="submit">회원가입</button>
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
