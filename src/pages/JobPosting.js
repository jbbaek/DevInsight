import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../css/JobPosting.css";

const JobPosting = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");

  const careerOptions = [
    { label: "전체", value: "" },
    { label: "신입", value: "신입" },
    { label: "1~5년", value: "1~5" },
    { label: "6~10년", value: "6~10" },
    { label: "11~15년", value: "11~15" },
    { label: "16년 이상", value: "16+" },
  ];

  const educationOptions = ["전체", "고졸", "초대졸", "대졸", "석사", "박사"];
  const [deadlineOptions, setDeadlineOptions] = useState([]);

  // 전체 채용공고 로딩
  useEffect(() => {
    fetch("http://localhost:5000/all-job-postings")
      .then((res) => res.json())
      .then((data) => {
        setAllJobs(data);
        setFilteredJobs(data);

        // 기술스택 필터
        const skillSet = new Set();
        data.forEach((job) => {
          if (job.기술스택) {
            job.기술스택.split(/[,/]/).forEach((tech) => {
              const trimmed = tech.trim();
              if (trimmed) skillSet.add(trimmed);
            });
          }
        });
        setSkills([...skillSet].sort());

        // 마감일 필터
        const deadlines = new Set();
        data.forEach((job) => {
          if (job.마감일) {
            const month = job.마감일.substring(0, 7); // YYYY-MM
            deadlines.add(month);
          }
        });
        setDeadlineOptions([...deadlines].sort());
      })
      .catch((err) => {
        console.error("❌ 채용공고 로딩 오류:", err);
      });
  }, []);

  // 필터 적용 함수
  const applyFilters = useCallback(() => {
    let filtered = [...allJobs];

    if (selectedSkill) {
      filtered = filtered.filter(
        (job) => job.기술스택 && job.기술스택.includes(selectedSkill)
      );
    }

    if (selectedDeadline) {
      filtered = filtered.filter(
        (job) => job.마감일 && job.마감일.startsWith(selectedDeadline)
      );
    }

    if (selectedCareer) {
      filtered = filtered.filter((job) => {
        const careerText = job.경력 || "";

        if (selectedCareer === "신입") {
          return careerText.includes("신입");
        }
        if (selectedCareer === "1~5") {
          return /\d+/.test(careerText) && /(1|2|3|4|5)년/.test(careerText);
        }
        if (selectedCareer === "6~10") {
          return /(6|7|8|9|10)년/.test(careerText);
        }
        if (selectedCareer === "11~15") {
          return /(1[1-5])년/.test(careerText);
        }
        if (selectedCareer === "16+") {
          return /(1[6-9]|\d{3,})년/.test(careerText);
        }
        return true;
      });
    }

    if (selectedEducation && selectedEducation !== "전체") {
      filtered = filtered.filter(
        (job) => job.학력 && job.학력.includes(selectedEducation)
      );
    }

    setFilteredJobs(filtered);
  }, [
    allJobs,
    selectedSkill,
    selectedDeadline,
    selectedCareer,
    selectedEducation,
  ]);

  // 필터가 변경될 때마다 필터 적용
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="job-posting-container">
      <h2>채용 공고 페이지</h2>

      <div className="filters">
        <label>
          기술스택:
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">전체</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>

        <label>
          마감월:
          <select
            value={selectedDeadline}
            onChange={(e) => setSelectedDeadline(e.target.value)}
          >
            <option value="">전체</option>
            {deadlineOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label>
          경력:
          <select
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
          >
            {careerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          학력:
          <select
            value={selectedEducation}
            onChange={(e) => setSelectedEducation(e.target.value)}
          >
            {educationOptions.map((edu) => (
              <option key={edu} value={edu}>
                {edu}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* 채용공고 미리보기 */}
      <section style={{ marginTop: "40px" }}>
        <h2>채용공고</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filteredJobs.map((job) => (
            <div
              key={job.채용공고id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                width: "300px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
              }}
            >
              <h3>{job.제목}</h3>
              <p>기업명: {job.기업명}</p>
              <p>마감일: {job.마감일}</p>
              <Link to={`/jobPosting/${job.채용공고id}`}>자세히 보기</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobPosting;
