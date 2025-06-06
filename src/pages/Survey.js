import React, { useState } from "react";
import "../css/Survey.css"; // 스타일링을 위한 CSS 파일 (아래에 포함)

const Survey = () => {
  // 설문 문항 정의
  const questions = [
    {
      question: "현재 다니고 있는 회사에 만족하시나요?",
      type: "scale", // 1~5점 척도
    },
    {
      question: "현재 기업의 연봉 수준에 만족하시나요?",
      type: "scale",
    },
    {
      question: "워라밸(Work-life balance)에 대한 만족도는?",
      type: "scale",
    },
    {
      question: "회사의 기술 성장 기회에 대한 만족도는?",
      type: "scale",
    },
    {
      question: "상사 및 동료와의 관계에 만족하시나요?",
      type: "scale",
    },
    {
      question: "이직을 고려하고 계신가요?",
      type: "single-choice",
      options: [
        { label: "네 (6개월 이내)", value: "within-6-months" },
        { label: "네 (1년 이내)", value: "within-1-year" },
        { label: "아니요 (당분간 이직 계획 없음)", value: "no-plan" },
      ],
    },
    {
      question: "현재 회사에서 가장 개선이 필요한 부분은 무엇인가요?",
      type: "text", // 주관식
    },
    {
      question: "이직을 고민하는 가장 큰 이유는 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "연봉 불만족", value: "salary" },
        { label: "성장 기회 부족", value: "growth-opportunity" },
        { label: "워라밸 문제", value: "work-life-balance" },
        { label: "사내 문화 문제", value: "culture" },
        { label: "업무 과다", value: "workload" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "개발자로서 가장 어려웠던 점은 무엇인가요?",
      type: "text",
    },
    {
      question:
        "개발자로서 성장하기 위해 가장 중요하다고 생각하는 요소는 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "실무 경험", value: "experience" },
        { label: "멘토링 및 네트워크", value: "mentoring" },
        { label: "지속적인 학습 (온라인 강의, 책 등)", value: "learning" },
        { label: "오픈소스 기여", value: "open-source" },
        { label: "회사 내부의 기술 공유 문화", value: "tech-sharing" },
      ],
    },
    {
      question: "당신이 가장 많이 사용하는 학습 방법은 무엇인가요?",
      type: "single-choice",
      options: [
        { label: "유튜브 / 온라인 강의", value: "youtube" },
        { label: "기술 블로그 / 문서 읽기", value: "blog" },
        { label: "개발 관련 서적", value: "books" },
        { label: "해커톤 / 프로젝트 진행", value: "hackathon" },
        { label: "오픈소스 기여", value: "open-source" },
      ],
    },
    {
      question: "커리어 개발을 위해 추가적으로 배우고 싶은 기술이 있나요?",
      type: "text",
    },
    {
      question: "5년 후 본인의 커리어 목표는 무엇인가요?",
      type: "single-choice",
      options: [
        { label: "CTO / 기술 리더", value: "cto" },
        { label: "시니어 개발자", value: "senior-dev" },
        { label: "창업", value: "startup" },
        { label: "프리랜서 개발자", value: "freelancer" },
        { label: "커리어 변경 (비개발 직군으로 전환)", value: "career-change" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "당신이 가장 선호하는 업무 환경은 무엇인가요?",
      type: "single-choice",
      options: [
        { label: "사무실 출근", value: "office" },
        { label: "하이브리드 근무", value: "hybrid" },
        { label: "완전 원격 근무", value: "remote" },
      ],
    },
    {
      question: "당신이 가장 많이 사용하는 협업 도구는 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "Slack", value: "slack" },
        { label: "Microsoft Teams", value: "teams" },
        { label: "Jira / Trello", value: "jira-trello" },
        { label: "GitHub / GitLab", value: "github-gitlab" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "하루 평균 몇 시간 정도 집중해서 코딩을 하나요?",
      type: "single-choice",
      options: [
        { label: "1시간 이하", value: "less-than-1" },
        { label: "1~3시간", value: "1-3" },
        { label: "3~5시간", value: "3-5" },
        { label: "5시간 이상", value: "more-than-5" },
      ],
    },
    {
      question: "업무 중 가장 방해가 되는 요소는 무엇인가요?",
      type: "single-choice",
      options: [
        { label: "불필요한 회의", value: "meetings" },
        { label: "슬랙 / 이메일 알림", value: "notifications" },
        { label: "작업 범위 변경 (스코프 크리핑)", value: "scope-creep" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question:
        "생산성을 높이기 위해 회사에서 개선해야 할 점이 있다면 무엇인가요?",
      type: "text",
    },
    {
      question: "최근 1년 내 개발자 면접을 보신 적이 있나요?",
      type: "single-choice",
      options: [
        { label: "네", value: "yes" },
        { label: "아니요", value: "no" },
      ],
    },
    {
      question: "면접 유형은 어떤 것이었나요?",
      type: "multi-choice",
      options: [
        { label: "코딩 테스트", value: "coding-test" },
        { label: "기술 면접", value: "technical-interview" },
        { label: "시스템 설계 면접", value: "system-design" },
        { label: "문화 적합성 면접", value: "culture-fit" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "면접에서 가장 어려웠던 부분은 무엇인가요?",
      type: "text",
    },
    {
      question: "어떤 면접 유형이 가장 효과적이라고 생각하시나요?",
      type: "single-choice",
      options: [
        { label: "알고리즘 테스트", value: "algorithm-test" },
        { label: "프로젝트 기반 질문", value: "project-based" },
        { label: "시스템 설계 문제", value: "system-design" },
        { label: "코드 리뷰 진행", value: "code-review" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question:
        "개발자 채용 과정에서 가장 개선이 필요하다고 생각하는 부분은 무엇인가요?",
      type: "text",
    },
    {
      question: "해외 취업을 고려해본 적이 있나요?",
      type: "single-choice",
      options: [
        { label: "네", value: "yes" },
        { label: "아니요", value: "no" },
      ],
    },
    {
      question: "해외 취업을 원한다면, 어느 나라가 가장 매력적인가요?",
      type: "single-choice",
      options: [
        { label: "미국", value: "usa" },
        { label: "캐나다", value: "canada" },
        { label: "독일", value: "germany" },
        { label: "일본", value: "japan" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "해외 취업 시 가장 큰 장벽은 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "영어 실력", value: "english" },
        { label: "비자 문제", value: "visa" },
        { label: "해외 면접 준비 어려움", value: "interview-prep" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "프리랜서 개발자로 일할 의향이 있나요?",
      type: "single-choice",
      options: [
        { label: "네, 현재 프리랜서로 활동 중", value: "currently-freelancer" },
        { label: "네, 관심 있음", value: "interested" },
        { label: "아니요", value: "no" },
      ],
    },
    {
      question: "귀사의 주요 사업 분야는 무엇인가요?",
      type: "single-choice",
      options: [
        { label: "IT / 소프트웨어", value: "it-software" },
        { label: "금융 / 핀테크", value: "fintech" },
        { label: "게임", value: "gaming" },
        { label: "제조 / 하드웨어", value: "manufacturing" },
        { label: "엔터테인먼트", value: "entertainment" },
        { label: "기타", value: "other" },
      ],
    },
    {
      question: "귀사가 원하는 개발자의 경력 수준은?",
      type: "single-choice",
      options: [
        { label: "신입", value: "entry-level" },
        { label: "1~3년 차", value: "1-3-years" },
        { label: "3~5년 차", value: "3-5-years" },
        { label: "5년 이상", value: "5-plus-years" },
      ],
    },
    {
      question: "원하는 개발자의 필수 기술 스택은 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "Python", value: "python" },
        { label: "JavaScript (React, Vue, Angular)", value: "javascript" },
        { label: "Java (Spring)", value: "java" },
        { label: "C/C++", value: "c-cpp" },
        { label: "Go", value: "go" },
        { label: "모바일 개발 (Kotlin / Swift)", value: "mobile" },
        { label: "데이터베이스 (SQL / NoSQL)", value: "database" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "연봉 범위는 어떻게 설정되어 있나요?",
      type: "single-choice",
      options: [
        { label: "3,000만 원 이하", value: "below-30m" },
        { label: "3,000만 원 ~ 5,000만 원", value: "30m-50m" },
        { label: "5,000만 원 ~ 7,000만 원", value: "50m-70m" },
        {
          label: "7,000만 원 이상 (경력에 따라 협의 가능)",
          value: "above-70m",
        },
      ],
    },
    {
      question: "기업이 제공하는 주요 복지 및 혜택은?",
      type: "multi-choice",
      options: [
        { label: "원격 근무 지원", value: "remote-work" },
        { label: "유연 근무제", value: "flexible-hours" },
        { label: "건강 검진 / 의료 지원", value: "healthcare" },
        { label: "스톡옵션", value: "stock-options" },
        { label: "기술 교육 지원", value: "tech-training" },
        { label: "도서 구매 지원", value: "book-support" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "사내 개발 문화는 어떤가요?",
      type: "multi-choice",
      options: [
        { label: "코드 리뷰 필수", value: "code-review" },
        { label: "오픈소스 기여 장려", value: "open-source" },
        { label: "주간/월간 기술 공유 세션 있음", value: "tech-sharing" },
        { label: "개발자 커뮤니티 활동 적극 지원", value: "community-support" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question:
        "기업이 중요하게 생각하는 개발자의 역량은? (최대 3개 선택 가능)",
      type: "multi-choice",
      maxSelections: 3,
      options: [
        { label: "문제 해결 능력", value: "problem-solving" },
        { label: "협업 능력", value: "collaboration" },
        { label: "빠른 학습 속도", value: "learning-speed" },
        { label: "오픈소스 기여 경험", value: "open-source" },
        { label: "도전적인 태도", value: "challenging-attitude" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "현재 IT 업계의 성장 가능성에 대해 어떻게 생각하시나요?",
      type: "scale",
    },
    {
      question:
        "AI 및 자동화 기술이 개발자 일자리에 미치는 영향에 대해 어떻게 예상하시나요?",
      type: "single-choice",
      options: [
        { label: "새로운 일자리 창출로 이어질 것이다.", value: "job-creation" },
        {
          label:
            "일부 일자리는 줄어들겠지만, 전체적인 변화는 크지 않을 것이다.",
          value: "minor-change",
        },
        { label: "개발자의 수요가 감소할 것이다.", value: "demand-decrease" },
        { label: "잘 모르겠다.", value: "unsure" },
      ],
    },
    {
      question: "IT 업계에서 가장 중요하다고 생각하는 트렌드는 무엇인가요?",
      type: "multi-choice",
      options: [
        { label: "AI 및 머신러닝", value: "ai-ml" },
        { label: "블록체인 및 Web3", value: "blockchain" },
        { label: "클라우드 및 DevOps", value: "cloud-devops" },
        { label: "메타버스 및 XR(AR/VR)", value: "metaverse-xr" },
        { label: "사이버 보안", value: "cybersecurity" },
        { label: "양자 컴퓨팅", value: "quantum-computing" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "개발자 채용 시 가장 중요한 요소는 무엇이라고 생각하시나요?",
      type: "single-choice",
      options: [
        { label: "실무 경험", value: "experience" },
        { label: "학력 및 전공", value: "education" },
        { label: "프로젝트 포트폴리오", value: "portfolio" },
        { label: "알고리즘 및 문제 해결 능력", value: "algorithm" },
        { label: "커뮤니케이션 능력", value: "communication" },
        { label: "기타", value: "other", hasText: true },
      ],
    },
    {
      question: "오픈소스를 적극적으로 사용하시나요?",
      type: "single-choice",
      options: [
        { label: "네", value: "yes" },
        { label: "아니요", value: "no" },
      ],
    },
    {
      question: "오픈소스 기여 경험이 있나요?",
      type: "single-choice",
      options: [
        { label: "네, 적극적으로 기여함", value: "active" },
        { label: "가끔 기여함", value: "occasional" },
        { label: "아니요", value: "no" },
      ],
    },
    {
      question:
        "소프트웨어 개발에서 가장 중요한 윤리적 이슈는 무엇이라고 생각하시나요?",
      type: "multi-choice",
      options: [
        { label: "개인정보 보호", value: "privacy" },
        { label: "AI 윤리 및 편향성", value: "ai-ethics" },
        { label: "코드 보안 및 해킹 방지", value: "security" },
        { label: "오픈소스 라이선스 준수", value: "license-compliance" },
      ],
    },
    {
      question: "개발자로서 윤리적 문제에 대해 고민해본 적이 있나요?",
      type: "scale",
    },
  ];

  // 설문 응답을 저장할 상태
  const [responses, setResponses] = useState({});

  // 5점 척도 변경 핸들러
  const handleScaleChange = (questionIndex, value) => {
    setResponses({
      ...responses,
      [questionIndex]: value,
    });
  };

  // 단일 선택 변경 핸들러
  const handleSingleChoiceChange = (questionIndex, value) => {
    setResponses({
      ...responses,
      [questionIndex]: value,
    });
  };

  // 중복 선택 변경 핸들러
  const handleMultiChoiceChange = (questionIndex, value, maxSelections) => {
    const currentSelections = responses[questionIndex] || [];
    let newSelections;

    if (currentSelections.includes(value)) {
      newSelections = currentSelections.filter((item) => item !== value);
    } else {
      if (maxSelections && currentSelections.length >= maxSelections) {
        alert(`최대 ${maxSelections}개까지 선택 가능합니다.`);
        return;
      }
      newSelections = [...currentSelections, value];
    }

    setResponses({
      ...responses,
      [questionIndex]: newSelections,
    });
  };

  // 주관식 입력 변경 핸들러
  const handleTextChange = (questionIndex, value) => {
    setResponses({
      ...responses,
      [questionIndex]: value,
    });
  };

  // 기타 입력 변경 핸들러
  const handleOtherTextChange = (questionIndex, parentValue, value) => {
    setResponses({
      ...responses,
      [questionIndex]: {
        ...responses[questionIndex],
        [parentValue]: value,
      },
    });
  };

  // 설문 제출 핸들러
  const handleSubmit = () => {
    console.log("설문 결과:", responses);
    alert("설문이 제출되었습니다! 콘솔에서 결과를 확인하세요.");
  };

  // 5점 척도 옵션
  const scaleOptions = [
    { label: "매우 만족", value: 5 },
    { label: "", value: 4 },
    { label: "", value: 3 },
    { label: "", value: 2 },
    { label: "매우 불만족", value: 1 },
  ];

  return (
    <div className="survey-container">
      <h1>개발자 설문조사</h1>
      <div className="survey">
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <p className="survey-p">
              {index + 1}. {q.question}
            </p>
            {q.type === "scale" && (
              <div className="options scale-options">
                {scaleOptions.map((option, optIndex) => (
                  <label key={optIndex} className="option-label">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={responses[index] === option.value}
                      onChange={() => handleScaleChange(index, option.value)}
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
            )}
            {q.type === "single-choice" && (
              <div className="options single-choice-options">
                {q.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <label className="option-label">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.value}
                        checked={responses[index] === option.value}
                        onChange={() =>
                          handleSingleChoiceChange(index, option.value)
                        }
                      />
                      <span className="circle"></span>
                      <span className="label-text">{option.label}</span>
                    </label>
                    {option.hasText && responses[index] === option.value && (
                      <input
                        type="text"
                        className="other-input"
                        placeholder="기타 내용을 입력하세요"
                        value={responses[index]?.[option.value] || ""}
                        onChange={(e) =>
                          handleOtherTextChange(
                            index,
                            option.value,
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            {q.type === "multi-choice" && (
              <div className="options multi-choice-options">
                {q.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={(responses[index] || []).includes(
                          option.value
                        )}
                        onChange={() =>
                          handleMultiChoiceChange(
                            index,
                            option.value,
                            q.maxSelections
                          )
                        }
                      />
                      <span className="checkbox"></span>
                      <span className="label-text">{option.label}</span>
                    </label>
                    {option.hasText &&
                      (responses[index] || []).includes(option.value) && (
                        <input
                          type="text"
                          className="other-input"
                          placeholder="기타 내용을 입력하세요"
                          value={responses[index]?.[option.value] || ""}
                          onChange={(e) =>
                            handleOtherTextChange(
                              index,
                              option.value,
                              e.target.value
                            )
                          }
                        />
                      )}
                  </div>
                ))}
              </div>
            )}
            {q.type === "text" && (
              <textarea
                className="text-input"
                placeholder="여기에 답변을 입력하세요"
                value={responses[index] || ""}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        설문 제출
      </button>
    </div>
  );
};

export default Survey;
