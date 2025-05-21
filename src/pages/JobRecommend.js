import React, { useState } from "react";
import "../css/JobRecommend.css"; // 스타일링을 위한 CSS 파일

const JobRecommend = () => {
  const questionList = [
    "어떤 서비스를 사용할 때 ‘이건 왜 이렇게 만들었을까?’라는 생각을 자주 하나요?",
    "현실의 공간을 디지털로 구현하는 것에 관심이 많나요?",
    "앱을 만들게 된다면 어떤 부분이 더 재미있을 것 같나요?",
    "여러 데이터를 다루는 작업에 자신 있거나 흥미가 있나요?",
    "반복되는 실험이나 테스트를 꾸준히 수행하는 걸 즐기시나요?",
    "‘작동 원리를 이해하는 것’이 중요하다고 생각하시나요?",
    "기획서를 보며 기능을 구현하는 데 흥미가 있나요?",
    "기술보다 사용자의 경험이 더 중요하다고 생각하나요?",
    "하드웨어나 기계가 어떻게 작동하는지에 흥미가 있나요?",
    "데이터를 분석하거나 패턴을 찾아내는 작업을 즐기는 편인가요?",
    "다양한 플랫폼(웹, 모바일 등)에 동시에 대응하는 앱 개발에 관심이 있나요?",
    "사람들이 사용하는 기능을 직접 기획하고 관리하는 것에 관심이 많나요?",
    "사람들이 더 편하게 쓸 수 있도록 화면 디자인을 조정하거나 애니메이션을 넣는 작업이 재미있게 느껴지나요?",
    "정보를 안전하게 보호하거나 시스템을 외부 공격으로부터 방어하는 일에 흥미를 느끼나요?",
    "게임 시스템이나 캐릭터 능력치, 밸런스 등을 설계하는 데 관심이 있나요?",
    "주어진 데이터를 기반으로 예측 모델을 만들거나, AI가 스스로 학습하게 만드는 것에 흥미가 있나요?",
    "문제 상황에서 시스템의 원인을 분석하고 해결책을 찾는 것을 좋아하나요?",
    "시스템 성능을 높이기 위해 서버나 데이터베이스 구조를 최적화하는 일에 관심이 있나요?",
    "영상을 편집하거나 음성을 처리하는 기술에 관심이 있나요?",
    "사람들과 협업하며 전체 서비스를 조율하고 관리하는 역할에 끌리나요?",
    "가상현실(VR)이나 증강현실(AR) 기술을 활용한 콘텐츠 제작에 흥미가 있나요?",
    "게임의 네트워크 동기화, 서버와 클라이언트 간 데이터 흐름에 관심이 있나요?",
    "소프트웨어나 하드웨어를 통해 실시간 데이터를 처리하거나 제어하는 시스템에 관심이 있나요?",
    "시스템이나 애플리케이션이 많은 양의 데이터를 효율적으로 처리할 수 있도록 구조를 설계하는 데 관심이 있나요?",
    "다양한 기기나 환경에서 동일한 사용자 경험을 제공하는 앱을 만들고 싶은가요?",
    "특정 기능을 사용자에게 직접 제공하는 앱을 디자인하고 개발하는 데 관심이 있나요?",
    "개발한 프로그램의 품질을 지속적으로 개선하고 문제를 해결하는 데 집중하는 작업이 즐거운가요?",
    "사람들의 행동이나 선택을 예측하고 그에 맞는 알고리즘을 개발하는 데 흥미가 있나요?",
    "웹 애플리케이션을 구축할 때 보안과 데이터 보호를 신경 써야 한다고 생각하나요?",
    "사용자와의 소통을 중요하게 생각하며, 그에 맞는 기능을 개발하는 데 집중하고 싶은가요?",
  ];

  const multiLevelOptions = [
    { label: "그렇다", value: 5 },
    { label: "", value: 4 },
    { label: "", value: 3 },
    { label: "", value: 2 },
    { label: "그렇지 않다", value: 1 },
  ];

  const [responses, setResponses] = useState({});

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = () => {
    console.log("직무 성향 설문 결과:", responses);
    alert("설문이 제출되었습니다! 콘솔에서 결과를 확인하세요.");
  };

  return (
    <div className="JobRecommend-container">
      <h1>개발자 직무 성향 테스트</h1>
      <p>각 문항에 대해 5단계(그렇다 ~ 그렇지 않다)로 선택해주세요.</p>
      <div className="JobRecommend">
        {questionList.map((question, index) => (
          <div key={index} className="question-block">
            <p>
              {index + 1}. {question}
            </p>
            <div className="options multi-level-options">
              {multiLevelOptions.map((option, optIndex) => (
                <label key={optIndex} className="option-label">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.value}
                    checked={responses[index] === option.value}
                    onChange={() => handleChange(index, option.value)}
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
      <button onClick={handleSubmit} className="submit-button">
        설문 제출
      </button>
    </div>
  );
};

export default JobRecommend;
