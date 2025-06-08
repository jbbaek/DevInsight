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
import CompanySignup from "./pages/CompanySignup";
import LevelTest from "./pages/LevelTest";
import Library from "./pages/Library";
import CodingTest from "./pages/CodingTest";
import QuestionPage from "./pages/QuestionPage";
import JobPostingDetail from "./pages/JobPostingDetail";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyMainpage from "./pages/CompanyMainpage";
import CompanyMypage from "./pages/CompanyMypage";
import CompanyPosting from "./pages/CompanyPosting";
import Selfintroduction from "./pages/Selfintroduction";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/companymain" element={<CompanyMainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/community" element={<Community />} />
        <Route path="/jobPosting" element={<JobPosting />} />
        <Route path="/jobPosting/:id" element={<JobPostingDetail />} />
        <Route path="/Company/:id" element={<CompanyDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/companymypage" element={<CompanyMypage />} />
        <Route path="/careerRoadmap" element={<CareerRoadmap />} />
        <Route path="/interviewpre" element={<InterviewPre />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/JobRecommend" element={<JobRecommend />} />
        <Route path="/Selfintroduction" element={<Selfintroduction />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/CompanySignup" element={<CompanySignup />} />
        <Route path="/LevelTest" element={<LevelTest />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="Library" element={<Library />} />
        <Route path="CodingTest" element={<CodingTest />} />
        <Route path="CompanyPosting" element={<CompanyPosting />} />
      </Routes>
    </>
  );
}

export default App;
