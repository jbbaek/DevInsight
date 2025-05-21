import React, { useState, useEffect } from "react";
import axios from "axios";

const MyPage = () => {
  const [selectedContent, setSelectedContent] = useState(
    "이력서&포트폴리오 등록 페이지입니다."
  );
  const [userInfo, setUserInfo] = useState(null);

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
        setUserInfo(null); // fallback 처리
      });
  }, []);

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>마이페이지</h1>
      <h2>내 정보</h2>
      <div
        style={{
          display: "flex",
          padding: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* 왼쪽 메뉴 */}
        <div
          style={{
            width: "200px",
            borderRight: "2px solid #ddd",
            paddingRight: "20px",
          }}
        >
          <p
            onClick={() =>
              setSelectedContent("이력서&포트폴리오 등록 페이지입니다.")
            }
            style={styles.menuItem}
          >
            이력서&포트폴리오 등록
          </p>
          <p
            onClick={() => setSelectedContent("직군추천 결과 화면입니다.")}
            style={styles.menuItem}
          >
            직군추천 결과
          </p>
          <p
            onClick={() => setSelectedContent("최근 본 내역 페이지입니다.")}
            style={styles.menuItem}
          >
            최근 본 내역
          </p>
          <p
            onClick={() => setSelectedContent("내가 작성한 게시글 목록입니다.")}
            style={styles.menuItem}
          >
            내가 작성한 게시글
          </p>
        </div>

        {/* 오른쪽 콘텐츠 영역 */}
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
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

          <h2>선택한 항목</h2>
          <p>{selectedContent}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  menuItem: {
    cursor: "pointer",
    padding: "5px 0",
    color: "blue",
    textDecoration: "underline",
  },
};

export default MyPage;
