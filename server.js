const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors()); // React와 통신을 위해 CORS 설정
app.use(express.json()); // JSON 데이터 파싱

// MySQL 연결 설정
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_password", // MySQL 비밀번호로 교체
  database: "quiz_db",
});

// 서버 시작
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// API 엔드포인트: 질문 조회
app.get("/api/questions", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM 문항 LIMIT 10");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching questions");
  }
});

// API 엔드포인트: 답변 제출 및 점수 저장
app.post("/api/submit-answer", async (req, res) => {
  const { 문항id, 사용자응답id, 사용자답변 } = req.body;
  try {
    const [문항] = await pool.query("SELECT 정답 FROM 문항 WHERE 문항id = ?", [
      문항id,
    ]);
    const isCorrect = 문항[0].정답 === parseInt(사용자답변);

    const 문항응답id = `R${Date.now()}`;
    await pool.query(
      "INSERT INTO 문항응답 (문항응답id, 문항id, 사용자응답id, 사용자답변) VALUES (?, ?, ?, ?)",
      [문항응답id, 문항id, 사용자응답id, `Bronze(${사용자답변})`]
    );

    const 문항점수id = `S${Date.now()}`;
    await pool.query(
      "INSERT INTO 문항점수 (문항점수id, 문항응답id, 문항id, 점수) VALUES (?, ?, ?, ?)",
      [문항점수id, 문항응답id, 문항id, isCorrect ? 10 : 0]
    );

    res.json({ success: true, score: isCorrect ? 10 : 0, isCorrect });
  } catch (error) {
    res.status(500).send("Error submitting answer");
  }
});
