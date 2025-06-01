import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Addpost.css";

const AddPost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    채용공고id: "",
    기업id: "",
    제목: "",
    기업명: "",
    태그: "",
    기술스택: "",
    마감일: "",
    기업소개: "",
    경력: "",
    학력: "",
    주요업무: "",
    자격요건: "",
    우대사항: "",
    복지및혜택: "",
    채용절차: "",
    위치: "",
  });
  const [idChecked, setIdChecked] = useState(false);

  // 1. 기업ID 자동 세팅 (최초 렌더링 시)
  useEffect(() => {
    const savedCompanyId =
      sessionStorage.getItem("기업id") || localStorage.getItem("기업id") || "";
    setForm((prev) => ({ ...prev, 기업id: savedCompanyId }));

    // 2. 기업명 DB에서 가져오기
    if (savedCompanyId) {
      fetch(`http://localhost:5000/company/${savedCompanyId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm((prev) => ({
            ...prev,
            기업명: data.기업명 || "", // DB에서 받은 기업명
          }));
        })
        .catch(() => {
          // 에러시 기업명 비워둠
          setForm((prev) => ({ ...prev, 기업명: "" }));
        });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "채용공고id") setIdChecked(false);
  };

  const handleCheckId = async () => {
    if (!form.채용공고id) {
      alert("채용공고ID를 입력해주세요.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/check-jobpost-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 채용공고id: form.채용공고id }),
      });
      const data = await res.json();
      if (data.exists) {
        alert("이미 존재하는 채용공고ID입니다.");
        setIdChecked(false);
      } else {
        alert("사용 가능한 채용공고ID입니다.");
        setIdChecked(true);
      }
    } catch {
      alert("서버 오류!");
      setIdChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idChecked) {
      alert("채용공고ID 중복확인을 먼저 해주세요.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("채용공고가 성공적으로 등록되었습니다!");
        navigate("/companymain"); // ← 성공 시 기업 메인페이지로 이동!
      } else {
        const data = await res.json();
        alert("등록 실패: " + (data.message || ""));
      }
    } catch (err) {
      alert("서버 오류!");
    }
  };

  return (
    <div className="addpost-container">
      <h1 className="addpost-title">채용공고 등록</h1>
      <form className="addpost-form" onSubmit={handleSubmit}>
        <div className="addpost-row">
          <label>채용공고ID</label>
          <input
            name="채용공고id"
            value={form.채용공고id}
            onChange={handleChange}
            className="addpost-input"
            required
          />
          <button
            type="button"
            className="addpost-check-btn"
            onClick={handleCheckId}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#6695df",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            중복확인
          </button>
        </div>
        {/* 기업ID - 읽기 전용 + hidden */}
        <div className="addpost-row">
          <label>기업ID</label>
          <input
            name="기업id"
            value={form.기업id}
            className="addpost-input"
            readOnly
            disabled
          />
          <input type="hidden" name="기업id" value={form.기업id} />
        </div>
        {/* 기업명 - 읽기 전용 + hidden */}
        <div className="addpost-row">
          <label>기업명</label>
          <input
            name="기업명"
            value={form.기업명}
            className="addpost-input"
            readOnly
            disabled
          />
          <input type="hidden" name="기업명" value={form.기업명} />
        </div>
        {/* 나머지 입력 필드 */}
        <div className="addpost-row">
          <label>제목</label>
          <input
            name="제목"
            value={form.제목}
            onChange={handleChange}
            className="addpost-input"
            required
          />
        </div>
        {/* 이하 기존 코드 동일... */}
        <div className="addpost-row">
          <label>태그</label>
          <input
            name="태그"
            value={form.태그}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        {/* ... 생략 ... */}
        <div className="addpost-row">
          <label>기술스택</label>
          <input
            name="기술스택"
            value={form.기술스택}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>마감일</label>
          <input
            name="마감일"
            value={form.마감일}
            onChange={handleChange}
            className="addpost-input"
            placeholder="예: 2025-06-30"
          />
        </div>
        <div className="addpost-row">
          <label>기업 소개</label>
          <textarea
            name="기업소개"
            value={form.기업소개}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>경력</label>
          <input
            name="경력"
            value={form.경력}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        {/* 이하 생략, 기존대로 계속 */}
        <div className="addpost-row">
          <label>학력</label>
          <input
            name="학력"
            value={form.학력}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>주요업무</label>
          <input
            name="주요업무"
            value={form.주요업무}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>자격요건</label>
          <input
            name="자격요건"
            value={form.자격요건}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>우대사항</label>
          <input
            name="우대사항"
            value={form.우대사항}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>복지 및 혜택</label>
          <input
            name="복지및혜택"
            value={form.복지및혜택}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>채용절차</label>
          <input
            name="채용절차"
            value={form.채용절차}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <div className="addpost-row">
          <label>위치</label>
          <input
            name="위치"
            value={form.위치}
            onChange={handleChange}
            className="addpost-input"
          />
        </div>
        <button className="addpost-submit-btn" type="submit">
          채용공고 올리기
        </button>
      </form>
    </div>
  );
};

export default AddPost;
