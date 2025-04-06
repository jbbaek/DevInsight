import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div>
      <h1>커뮤니티</h1>
      <h2>
        <Link to="/AddPost">게시글 작성하기</Link>
      </h2>
      <p>게시글 목록을 확인하세요.</p>
    </div>
  );
};

export default Community;
