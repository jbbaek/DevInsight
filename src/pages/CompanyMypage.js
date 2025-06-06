import React, { useState, useEffect } from "react";
import "../css/CompanyMypage.css";

const initialState = {
  기업id: "",
  기업명: "",
  비밀번호: "",
  로고url: "",
  "설립 연도": "",
  "기업 연차": "",
  "기업 설명": "",
  표준산업분류: "",
  연혁: "",
  "NTS 분류": "",
  매출액: "",
  평균연봉: "",
  기업유형: "",
  대표자명: "",
  홈페이지: "",
  "고용보험 사업장 수": "",
  "고용보험가입 사원 수": "",
  통신판매관리번호: "",
  "국민연금 가입 사원 수": "",
  퇴사년: "",
  입사년: "",
  법인시장구분: "",
  상장종목코드: "",
  총인원: "",
  주소: "",
};

const labelKor = {
  기업id: "기업 ID",
  기업명: "기업명",
  비밀번호: "비밀번호",
  로고url: "로고 URL",
  "설립 연도": "설립 연도",
  "기업 연차": "기업 연차",
  "기업 설명": "기업 설명",
  표준산업분류: "표준산업분류",
  연혁: "연혁",
  "NTS 분류": "NTS 분류",
  매출액: "매출액",
  평균연봉: "평균연봉",
  기업유형: "기업유형",
  대표자명: "대표자명",
  홈페이지: "홈페이지",
  "고용보험 사업장 수": "고용보험 사업장 수",
  "고용보험가입 사원 수": "고용보험가입 사원 수",
  통신판매관리번호: "통신판매관리번호",
  "국민연금 가입 사원 수": "국민연금 가입 사원 수",
  퇴사년: "퇴사년",
  입사년: "입사년",
  법인시장구분: "법인시장구분",
  상장종목코드: "상장종목코드",
  총인원: "총인원",
  주소: "주소",
};

const readOnlyFields = ["기업id", "기업명", "비밀번호"];

const CompanyMypage = () => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const 기업id = sessionStorage.getItem("기업id");
    if (기업id) {
      fetch(`http://localhost:5000/company/${기업id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => {});
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // 저장 전 form 값 확인(필요시)
    // console.log(form);
    try {
      const res = await fetch("http://localhost:5000/company-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("저장되었습니다!");
      } else {
        const result = await res.json();
        alert("저장 실패: " + (result.message || ""));
      }
    } catch (err) {
      alert("서버 오류!");
    }
  };

  return (
    <div className="companymypage-bg">
      <div className="companymypage-card">
        <h2 className="companymypage-title">기업 마이페이지</h2>
        <form onSubmit={handleSave}>
          {readOnlyFields.map((key) => (
            <div className="form-group" key={key}>
              <label>{labelKor[key]}</label>
              <input type="text" value={form[key] || ""} readOnly disabled />
              <input type="hidden" name={key} value={form[key] || ""} />
            </div>
          ))}
          {Object.keys(initialState)
            .filter((key) => !readOnlyFields.includes(key))
            .map((key) => (
              <div className="form-group" key={key}>
                <label>{labelKor[key]}</label>
                <input
                  type="text"
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          <button className="companymypage-save-btn" type="submit">
            저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyMypage;
