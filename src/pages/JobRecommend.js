import React, { useState } from "react";
import "../css/JobRecommend.css"; // 스타일링을 위한 CSS 파일 (아래에 포함)

const JobRecommend = () => {
  const multiLevelQuestions = [
    "디자인을 직접 조작하는 일이 많아도 괜찮나요?",
    "시스템이 커질 경우, 코드 설계에서 신중하게 고민하는 편인가요?",
    "서버 성능을 10% 개선하면 운영 비용이 절감된다는 말에 어떻게 반응하나요?",
    '"버튼 위치를 바꾸면 사용자 경험이 개선될 것 같다"는 생각을 자주 하나요?',
    "대용량 데이터를 다루는 것이 어렵지만 흥미롭다고 생각하나요?",
    "인프라나 배포 자동화 같은 작업이 더 재미있나요?",
    "새로운 기술을 배울 때 선호하는 방식은?",
    "책보다 웹 문서나 튜토리얼을 보고 공부하는 편인가요?",
    "코드를 작성할 때 나만 이해하면 되기보다, 다른 사람이 보기 쉽게 정리하는 편인가요?",
    '"이 반복적인 작업을 자동화하면 좋겠다"는 생각을 자주 하나요?',
    "하나의 서비스를 처음부터 끝까지 만들고 운영하는 걸 선호하나요?",
    "네트워크와 서버 관리에 관심이 있나요?",
    "VR/AR 콘텐츠 개발에 관심이 있나요?",
    "로봇이나 IoT 기기를 프로그래밍하는 것이 흥미롭나요?",
    "블록체인 기술에 관심이 있나요?",
    "클라우드 플랫폼에 대한 경험이 있나요?",
    "데이터 분석과 패턴을 찾는 것이 재미있나요?",
    "게임의 서버 측 개발을 해본 적 있나요?",
    "보안이 중요한 시스템 개발에 대해 어떻게 생각하나요?",
    "AI 모델 학습에 대해 관심이 있나요?",
    "게임 내 인공지능을 구현한 경험이 있나요?",
    "멀티태스킹을 잘 처리하는 편인가요?",
    "빠른 문제 해결을 위해 바로 시도하고 고치는 편인가요?",
    "자주 발생하는 에러를 자동으로 처리하는 방법을 고민하는 편인가요?",
    "데이터 흐름을 이해하고 다루는 것이 흥미로운가요?",
    "대규모 트래픽을 처리할 수 있는 시스템을 설계하는 데 관심이 있나요?",
    "서버와 클라이언트 간의 효율적인 데이터 전송 방식을 설계해본 경험이 있나요?",
    "보안 취약점 탐지와 패치 작업을 중요한 업무로 여기나요?",
  ];

  // 두 번째 설문 문항 (단일 선택지)
  const singleChoiceQuestions = [
    {
      question: "새로운 기술이 빠르게 등장하는 환경이 편한가요?",
      options: [
        { label: "흥미롭고 배우고 싶다!", value: "interested" },
        { label: "안정적인 기술을 더 선호한다.", value: "stable" },
        {
          label: "새로운 기술보다는 최적화와 성능 개선이 더 중요하다.",
          value: "optimization",
        },
      ],
    },
    {
      question: "개발할 때 가장 중요한 요소는?",
      options: [
        { label: "사용자의 경험과 UI/UX", value: "uiux" },
        { label: "서비스의 안정성과 확장성", value: "stability" },
        { label: "하드웨어와 소프트웨어 간의 연동", value: "integration" },
        { label: "보안과 네트워크 보호", value: "security" },
      ],
    },
  ];

  // 설문 응답을 저장할 상태
  const [multiLevelResponses, setMultiLevelResponses] = useState({}); // 5단계 선택지 응답
  const [singleChoiceResponses, setSingleChoiceResponses] = useState({}); // 단일 선택지 응답

  // 5단계 선택지 변경 핸들러
  const handleMultiLevelChange = (questionIndex, value) => {
    setMultiLevelResponses({
      ...multiLevelResponses,
      [questionIndex]: value,
    });
  };

  // 단일 선택지 변경 핸들러
  const handleSingleChoiceChange = (questionIndex, value) => {
    setSingleChoiceResponses({
      ...singleChoiceResponses,
      [questionIndex]: value,
    });
  };

  // 설문 제출 시 호출되는 함수
  const handleSubmit = () => {
    console.log("5단계 선택지 설문 결과:", multiLevelResponses);
    console.log("단일 선택지 설문 결과:", singleChoiceResponses);
    alert("설문이 제출되었습니다! 콘솔에서 결과를 확인하세요.");
  };

  // 5단계 선택지 옵션
  const multiLevelOptions = [
    { label: "그렇다", value: 5 },
    { label: "", value: 4 },
    { label: "", value: 3 },
    { label: "", value: 2 },
    { label: "그렇지 않다", value: 1 },
  ];

  return (
    <div className="JobRecommend-container">
      <h1>개발자 성향 설문조사</h1>

      {/* 첫 번째 섹션: 5단계 선택지 설문 */}
      <div className="JobRecommend-section">
        <p>각 문항에 대해 5단계(그렇다 ~ 그렇지 않다)로 선택해주세요.</p>
        <div className="JobRecommend">
          {multiLevelQuestions.map((question, index) => (
            <div key={index} className="question-block">
              <p>
                {index + 1}. {question}
              </p>
              <div className="options multi-level-options">
                {multiLevelOptions.map((option, optIndex) => (
                  <label key={optIndex} className="option-label">
                    <input
                      type="radio"
                      name={`multi-level-question-${index}`}
                      value={option.value}
                      checked={multiLevelResponses[index] === option.value}
                      onChange={() =>
                        handleMultiLevelChange(index, option.value)
                      }
                    />
                    <span
                      className={`circle ${
                        optIndex === 0
                          ? "green"
                          : optIndex === 4
                          ? "purple"
                          : optIndex === 2
                          ? "gray"
                          : ""
                      }`}
                    ></span>
                    {option.label && (
                      <span className="label-text">{option.label}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 두 번째 섹션: 단일 선택지 설문 */}
      <div className="JobRecommend-section">
        <p>각 문항에 대해 하나의 선택지만 선택해주세요.</p>
        <div className="JobRecommend">
          {singleChoiceQuestions.map((q, index) => (
            <div key={index} className="question-block">
              <p>
                {index + 1}. {q.question}
              </p>
              <div className="options single-choice-options">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="option-label">
                    <input
                      type="radio"
                      name={`single-choice-question-${index}`}
                      value={option.value}
                      checked={singleChoiceResponses[index] === option.value}
                      onChange={() =>
                        handleSingleChoiceChange(index, option.value)
                      }
                    />
                    <span className="circle"></span>
                    <span className="label-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        설문 제출
      </button>
    </div>
  );
};

export default JobRecommend;
