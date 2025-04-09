import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function JobTest() {
  const questions = [
    {
      id: "q1",
      text: "새로운 기술이 계속 나오면?",
      options: { frontend: "흥미롭다", backend: "귀찮다" },
    },
    {
      id: "q2",
      text: "시스템 성능 최적화가 중요한가요?",
      options: { backend: "네", frontend: "아니요" },
    },
    {
      id: "q3",
      text: "사용자 인터페이스 디자인을 좋아하나요?",
      options: { frontend: "네", backend: "아니요" },
    },
  ];

  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, job) => {
    setResponses((prev) => ({ ...prev, [questionId]: job }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    });
    const data = await response.json();
    setResult(data.scores);
  };

  return (
    <div>
      <h2>개발자 직무 테스트</h2>

      {!result ? (
        <div>
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "20px" }}>
              <p>{q.text}</p>
              {Object.entries(q.options).map(([job, label]) => (
                <button
                  key={job}
                  onClick={() => handleSelect(q.id, job)}
                  style={{
                    marginRight: "10px",
                    backgroundColor:
                      responses[q.id] === job ? "#8884d8" : "#f0f0f0",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length !== questions.length}
          >
            결과 보기
          </button>
        </div>
      ) : (
        <div>
          <h3>결과</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object.entries(result).map(([job, percentage]) => ({
                job,
                percentage,
              }))}
            >
              <XAxis dataKey="job" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default JobTest;
