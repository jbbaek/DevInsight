import React, { useState } from "react";

const MyPage = () => {
  const [selectedContent, setSelectedContent] =
    useState("입사지원현황을 선택하세요.");

  return (
    <div>
      <h1>마이페이지</h1>
      <h1>내 정보</h1>
      <div style={{ display: "flex", padding: "20px" }}>
        {/* 왼쪽 메뉴 */}
        <div
          style={{
            width: "200px",
            borderRight: "2px solid #ddd",
            paddingRight: "20px",
          }}
        >
          <p
            onClick={() => setSelectedContent("입사지원현황 내용입니다.")}
            style={styles.menuItem}
          >
            입사지원현황
          </p>
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
