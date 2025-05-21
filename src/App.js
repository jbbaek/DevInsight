import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Community from "./pages/Community";
import JobPosting from "./pages/JobPosting";
import Portfolio from "./pages/Portfolio";
import Survey from "./pages/Survey";
import MyPage from "./pages/MyPage";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewPre from "./pages/InterviewPre";
import Analysis from "./pages/Analysis";
import JobRecommend from "./pages/JobRecommend";
import AddPost from "./pages/AddPost";
import CommpanySignup from "./pages/CommpanySignup";
import LevelTest from "./pages/LevelTest";
import Library from "./pages/Library";
import CodingTest from "./pages/CodingTest";
import QuestionPage from "./pages/QuestionPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/community" element={<Community />} />
        <Route path="/jobPosting" element={<JobPosting />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/careerRoadmap" element={<CareerRoadmap />} />
        <Route path="/interviewpre" element={<InterviewPre />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/JobRecommend" element={<JobRecommend />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/CommpanySignup" element={<CommpanySignup />} />
        <Route path="/LevelTest" element={<LevelTest />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="Library" element={<Library />} />
        <Route path="CodingTest" element={<CodingTest />} />
      </Routes>
    </>
  );
}

export default App;
