const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Use promise-based mysql2 for async/await
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection configuration
const dbConfig = {
  host: "localhost",
  user: "manager",
  password: "1234",
  database: "devinsight",
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Connect to MySQL and log status
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL 연결 성공");
    connection.release();
  } catch (err) {
    console.error("DB 연결 실패:", err);
    process.exit(1);
  }
}
connectDB();

// Endpoint to fetch a question by ID
app.get("/question/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query(
      `SELECT m.문항id, m.문항내용, m.1번, m.2번, m.3번, m.4번, t.문제유형, t.난이도
       FROM 문항 m
       JOIN 문항유형 t ON m.문항유형id = t.문항유형id
       WHERE m.문항id = ?`,
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "문항을 찾을 수 없습니다." });
    }

    const question = {
      id: results[0].문항id,
      content: results[0].문항내용,
      options: [
        results[0]["1번"],
        results[0]["2번"],
        results[0]["3번"],
        results[0]["4번"],
      ],
      type: results[0].문제유형,
      difficulty: results[0].난이도,
    };

    return res.json(question);
  } catch (err) {
    console.error("쿼리 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

// Endpoint to check the user's answer
app.post("/check-answer", async (req, res) => {
  const { questionId, userAnswer } = req.body;

  // Validate input
  if (!questionId || !userAnswer || isNaN(parseInt(userAnswer))) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  try {
    const [results] = await pool.query(
      "SELECT 정답 FROM 문항 WHERE 문항id = ?",
      [questionId]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "문항을 찾을 수 없습니다." });
    }

    const correctAnswer = results[0].정답;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return res.json({
      isCorrect,
      correctAnswer,
      message: isCorrect ? "정답입니다!" : "오답입니다.",
    });
  } catch (err) {
    console.error("쿼리 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

// Endpoint to fetch all question IDs (for navigation)
app.get("/questions", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT 문항id FROM 문항 ORDER BY 문항id"
    );
    const questionIds = results.map((row) => row.문항id);
    return res.json(questionIds);
  } catch (err) {
    console.error("쿼리 오류:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
