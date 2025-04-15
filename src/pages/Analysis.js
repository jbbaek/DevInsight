import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../css/Analysis.css";

const Analysis = () => {
  const [parsedData, setParsedData] = useState([]);
  const [devTypes, setDevTypes] = useState([]);
  const [selectedDevType, setSelectedDevType] = useState(null);
  const [languageData, setLanguageData] = useState([]);
  const [overallDevTypeCount, setOverallDevTypeCount] = useState([]);

  useEffect(() => {
    fetch("/시각화요소_전처리.csv")
      .then((res) => {
        if (!res.ok) throw new Error("CSV 파일을 가져오지 못했습니다");
        return res.text();
      })
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        if (!parsed.data || parsed.data.length === 0) {
          console.error("CSV에서 데이터가 파싱되지 않았습니다");
          return;
        }
        console.log("파싱된 CSV 데이터:", parsed.data); // 디버깅: 파싱된 데이터 확인
        setParsedData(parsed.data);

        // LanguageHaveWorkedWith → 인기 언어
        const langMap = {};
        parsed.data.forEach((row, index) => {
          const langs = row["사용하는 프로그래밍 언어"];
          if (langs && typeof langs === "string") {
            langs.split(";").forEach((lang) => {
              lang = lang.trim(); // 공백 제거
              if (lang) langMap[lang] = (langMap[lang] || 0) + 1;
            });
          } else {
            console.warn(`행 ${index}의 언어 데이터가 유효하지 않습니다:`, row);
          }
        });
        const langData = Object.entries(langMap).map(([name, count]) => ({
          name,
          count,
        }));
        console.log("언어 데이터:", langData); // 디버깅: 언어 데이터 확인
        setLanguageData(langData);

        // 전체 DevType 카운트
        const devMap = {};
        const allDevTypes = parsed.data
          .filter((row) => row["개발자 유형(백엔드, 프론트엔드 등)"])
          .flatMap((row) =>
            row["개발자 유형(백엔드, 프론트엔드 등)"]
              .split(";")
              .map((type) => type.trim())
          );
        allDevTypes.forEach((type) => {
          if (type) devMap[type] = (devMap[type] || 0) + 1;
        });
        const devTypeData = Object.entries(devMap).map(([name, value]) => ({
          name,
          value,
        }));
        console.log("개발자 유형 데이터:", devTypeData); // 디버깅: 개발자 유형 데이터 확인
        setOverallDevTypeCount(devTypeData);
        setDevTypes(Object.keys(devMap).sort());
      })
      .catch((error) => {
        console.error("CSV 가져오기 또는 파싱 오류:", error);
      });
  }, []);

  const getSalaryDataForDev = (devType) => {
    const salaries = parsedData
      .filter((row) => {
        const types = row["개발자 유형(백엔드, 프론트엔드 등)"]; // ✅ 정확한 헤더명
        return types && types.includes(devType);
      })
      .map((row) => parseFloat(row["연봉을 달러 기준으로 환산한 값"])) // ✅ 정확한 헤더명
      .filter((val) => !isNaN(val));

    return salaries.length ? average(salaries) : null;
  };
  const getEmploymentDistribution = (devType) => {
    const empMap = {};
    parsedData.forEach((row) => {
      const types = row["개발자 유형(백엔드, 프론트엔드 등)"];
      const emp = row["고용상태(프리랜서, 풀타임)"];
      if (types && emp && types.includes(devType)) {
        empMap[emp] = (empMap[emp] || 0) + 1;
      }
    });
    return Object.entries(empMap).map(([name, value]) => ({ name, value }));
  };

  const getYearlySalaryForDev = (devType) => {
    const yearMap = {};
    parsedData
      .filter((row) => {
        const types = row["개발자 유형(백엔드, 프론트엔드 등)"];
        return types && types.includes(devType);
      })
      .forEach((row, index) => {
        const year = row["코딩 경력"]; // ✅ 실제 컬럼명으로 변경
        const salary = parseFloat(row["연봉을 달러 기준으로 환산한 값"]); // ✅ 실제 컬럼명
        if (year && !isNaN(salary)) {
          if (!yearMap[year]) yearMap[year] = [];
          yearMap[year].push(salary);
        } else {
          console.warn(
            `행 ${index}의 연차/연봉 데이터가 유효하지 않습니다:`,
            row
          );
        }
      });
    const yearlyData = Object.entries(yearMap)
      .map(([year, arr]) => ({
        year,
        averageSalary: Math.round(average(arr)),
      }))
      .sort((a, b) => a.year.localeCompare(b.year)); // 문자열 기준 정렬로 변경

    console.log(`${devType}의 연차별 연봉 데이터:`, yearlyData);
    return yearlyData;
  };

  return (
    <div className="analysis-container">
      {/* Main display - top section */}
      <div className="main-display">
        <h2>전체 분석</h2>

        <h4>1. 인기있는 언어</h4>
        {languageData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languageData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>언어 데이터가 없습니다.</p>
        )}

        <h4>2. 개발자 유형 분포</h4>
        {overallDevTypeCount.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overallDevTypeCount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>개발자 유형 데이터가 없습니다.</p>
        )}

        {/* Sidebar and conditional sections */}
        <div className="sidebar-content-container">
          <div className="sidebar">
            <h3>직무 목록</h3>
            {devTypes.length > 0 ? (
              devTypes.map((type, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDevType(type)}
                  className={`sidebar-item ${
                    selectedDevType === type ? "selected" : ""
                  }`}
                >
                  {type}
                </div>
              ))
            ) : (
              <p>직무 데이터가 없습니다.</p>
            )}
          </div>

          <div className="content">
            {selectedDevType ? (
              <>
                <h2>{selectedDevType} 분석</h2>

                <h4>1. 연차에 따른 연봉 변화</h4>
                {getYearlySalaryForDev(selectedDevType).length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getYearlySalaryForDev(selectedDevType)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="averageSalary"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p>연봉 데이터가 없습니다.</p>
                )}

                <h4>2. 평균 연봉</h4>
                <p>
                  {getSalaryDataForDev(selectedDevType)
                    ? `$${getSalaryDataForDev(
                        selectedDevType
                      ).toLocaleString()}`
                    : "데이터 없음"}
                </p>

                <h4>3. 고용 형태 분포</h4>
                {getEmploymentDistribution(selectedDevType).length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getEmploymentDistribution(selectedDevType)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p>고용 형태 데이터가 없습니다.</p>
                )}
              </>
            ) : (
              <p>왼쪽에서 직무를 선택해주세요</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

export default Analysis;
