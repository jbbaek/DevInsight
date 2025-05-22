import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MyPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const MyPage = () => {
  const [selectedContent, setSelectedContent] = useState(
    "이력서&포트폴리오 등록 페이지입니다."
  );
  const [userInfo, setUserInfo] = useState(null);
  const [allGradeInfo, setAllGradeInfo] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("회원id");
    if (
      !storedUserId ||
      storedUserId === "null" ||
      storedUserId === "undefined"
    ) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`http://localhost:5000/user/${storedUserId}`)
      .then((res) => setUserInfo(res.data))
      .catch((err) => {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
        setUserInfo(null);
      });

    axios
      .get(`http://localhost:5000/user-all-grade/${storedUserId}`)
      .then((res) => setAllGradeInfo(res.data))
      .catch((err) => console.error("📛 전체 등급 불러오기 실패:", err));
  }, []);

  if (!userInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="mypage-container">
      <h2 className="mypage-subtitle">내 정보</h2>

      <div className="profile-row">
        <div className="profile-icon-box">
          <FontAwesomeIcon icon={faCircleUser} className="profile-icon" />
        </div>

        <div className="profile-info-box">
          <p>
            <strong>이름:</strong> {userInfo.이름}
          </p>
          <p>
            <strong>이메일:</strong> {userInfo.이메일}
          </p>
          <p>
            <strong>역할:</strong> {userInfo.역할}
          </p>
          <p>
            <strong>가입일:</strong>{" "}
            {new Date(userInfo.가입일시).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mypage-body">
        <div className="mypage-sidebar">
          <p
            onClick={() =>
              setSelectedContent("이력서&포트폴리오 등록 페이지입니다.")
            }
          >
            이력서&포트폴리오 등록
          </p>
          <p onClick={() => setSelectedContent("직군추천 결과 화면입니다.")}>
            직군추천 결과
          </p>
          <p onClick={() => setSelectedContent("최근 본 내역 페이지입니다.")}>
            최근 본 내역
          </p>
          <p
            onClick={() => setSelectedContent("내가 작성한 게시글 목록입니다.")}
          >
            내가 작성한 게시글
          </p>
          <p onClick={() => setSelectedContent("내 결과보기")}>내 결과보기</p>
        </div>

        <div className="mypage-content">
          <h3 className="content-title">선택한 항목</h3>
          {selectedContent === "내 결과보기" && allGradeInfo ? (
            <div>
              <h4>기술도감별 점수 및 등급</h4>
              <table className="grade-table">
                <thead>
                  <tr>
                    <th>언어</th>
                    <th>프레임워크</th>
                    <th>라이브러리</th>
                    <th>풀이수</th> {/* ✅ 추가 */}
                    <th>점수</th>
                    <th>등급</th>
                  </tr>
                </thead>
                <tbody>
                  {allGradeInfo.목록.map((g, idx) => (
                    <tr key={idx}>
                      <td>{g.언어 || "-"}</td>
                      <td>{g.프레임워크 || "-"}</td>
                      <td>{g.라이브러리 || "-"}</td>
                      <td>{g.풀이수 || 0}</td> {/* ✅ 추가 */}
                      <td>{g["총점수"]}</td>
                      <td>{g.등급}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <p>
                전체 평균 점수: <strong>{allGradeInfo.평균}</strong>
              </p>
              <p>
                최종 등급: <strong>{allGradeInfo.최종등급}</strong>
              </p>
            </div>
          ) : (
            <p>{selectedContent}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
