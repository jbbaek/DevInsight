import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MyPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const MyPage = () => {
  const [selectedContent, setSelectedContent] = useState(
    "이력서&포트폴리오 등록 페이지입니다."
  );
  const [userInfo, setUserInfo] = useState(null);
  const [allGradeInfo, setAllGradeInfo] = useState(null);
  const [jobRecommendResult, setJobRecommendResult] = useState(null);

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

    axios
      .get(`http://localhost:5000/user-recommendation/${storedUserId}`)
      .then((res) => {
        console.log("직군추천 결과:", res.data); // 응답 구조 확인용
        setJobRecommendResult(res.data);
      })
      .catch((err) => console.error("📛 직군추천 결과 불러오기 실패:", err));
  }, []);

  // 파이차트 데이터 변환 함수 (문자열/객체 모두 방어)
  const getPieChartData = () => {
    if (!jobRecommendResult || !jobRecommendResult.top3) return [];
    let data = jobRecommendResult.top3;

    // 만약 top3가 문자열(분야명)만 있을 때
    if (typeof data[0] === "string") {
      // percent 없이 이름만 표시 (0%로 출력됨)
      return data.map((name) => ({
        name,
        percent: 0,
        raw: 0,
      }));
    }

    // percent 값이 없고 합계점수만 있는 경우
    if (!data[0]?.percent && data[0]?.합계점수) {
      const total = data.reduce((sum, d) => sum + (d.합계점수 || 0), 0);
      data = data.map((d) => ({
        name: d.분야이름 || d.role || d.분야id,
        percent: total > 0 ? Math.round((d.합계점수 / total) * 100) : 0,
        raw: d.합계점수,
      }));
    } else {
      // percent 필드가 이미 있는 경우
      data = data.map((d) => ({
        name: d.role || d.분야이름 || d.분야id,
        percent: d.percent,
        raw: d.percent,
      }));
    }
    // 이름, percent 둘 다 없는 값 제외
    return data.filter((item) => item.name && item.percent !== undefined);
  };

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
          <p onClick={() => setSelectedContent("직군추천 결과")}>
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

          {/* 직군추천 결과 */}
          {selectedContent === "직군추천 결과" && jobRecommendResult ? (
            getPieChartData().length === 0 ? (
              <div style={{ margin: "40px 0", fontWeight: "bold" }}>
                아직 테스트 결과가 없습니다.
                <br />
                직무 성향 테스트를 먼저 완료해 주세요!
              </div>
            ) : (
              <div>
                <h4>직군 추천 결과</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getPieChartData()}
                      dataKey="percent"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} (${percent}%)`}
                    >
                      {getPieChartData().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p>
                  <strong>Top 3 추천 분야:</strong>
                </p>
                <ol>
                  {getPieChartData().map((item, idx) => (
                    <li key={idx}>
                      {item.name} ({item.percent}%)
                    </li>
                  ))}
                </ol>
              </div>
            )
          ) : selectedContent === "내 결과보기" && allGradeInfo ? (
            <div>
              <h4>기술도감별 점수 및 등급</h4>
              <table className="grade-table">
                <thead>
                  <tr>
                    <th>언어</th>
                    <th>프레임워크</th>
                    <th>라이브러리</th>
                    <th>풀이수</th>
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
                      <td>{g.풀이수 || 0}</td>
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
