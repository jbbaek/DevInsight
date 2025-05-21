import React, { useState } from "react";
import "../css/Community.css";

const Community = () => {
  const [mode, setMode] = useState("list"); // list, write, detail
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "취업하기 너무 힘들어요 ㅠㅠ",
      content: "대학교 졸업했는데 취업이 안되네요 ㅠㅠ",
      views: 86,
      likes: 1,
      comments: ["익명의 누군가: 저도요 ㅠㅠ"],
      date: "2025.03.30",
    },
    {
      id: 2,
      title: "정책이 좋은지 확인해주세요",
      content: "지금 선택하려는 정책 얼마나 안정적인지... 의견 주세요.",
      views: 78,
      likes: 2,
      comments: [],
      date: "2025.03.30",
    },
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newComment, setNewComment] = useState("");

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setMode("detail");
  };

  const handlePostSubmit = () => {
    const newId = posts.length + 1;
    const postToAdd = {
      ...newPost,
      id: newId,
      views: 0,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split("T")[0],
    };
    setPosts([postToAdd, ...posts]);
    setNewPost({ title: "", content: "" });
    setMode("list");
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const updatedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, `익명: ${newComment}`],
    };
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setSelectedPost(updatedPost);
    setNewComment("");
  };

  return (
    <div className="community-container">
      <main className="community-main">
        {mode === "list" && (
          <>
            <h2>커뮤니티 게시판</h2>
            <div className="board-top">
              <button className="write-button" onClick={() => setMode("write")}>
                게시글 작성하기
              </button>
            </div>
            <div className="sort-buttons">
              <button>인기순</button>
              <button>최신순</button>
              <button>조회수</button>
            </div>
            <div className="post-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-item"
                  onClick={() => handlePostClick(post)}
                >
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="post-meta">
                    조회수 {post.views} · 좋아요 {post.likes} · 댓글{" "}
                    {post.comments.length} · {post.date} 작성
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {mode === "write" && (
          <div className="write-form">
            <h2>게시판 작성</h2>
            <label>제목</label>
            <input
              type="text"
              className="input-title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <label>내용</label>
            <textarea
              className="input-content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <div className="form-buttons">
              <button onClick={handlePostSubmit}>게시하기</button>
              <button onClick={() => setMode("list")}>취소</button>
            </div>
          </div>
        )}

        {mode === "detail" && selectedPost && (
          <div className="post-detail">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <div className="post-meta">
              조회수 {selectedPost.views} · 좋아요 {selectedPost.likes} ·{" "}
              {selectedPost.date} 작성
            </div>

            <div className="comments-section">
              <h4>댓글</h4>
              {selectedPost.comments.map((cmt, idx) => (
                <p key={idx}>{cmt}</p>
              ))}
              <input
                type="text"
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="form-buttons">
                <button onClick={handleCommentSubmit}>댓글 달기</button>
                <button onClick={() => setMode("list")}>목록으로</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
