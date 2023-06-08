import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QnaPosted.css';

function QnaPosted() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/auth/qnaposts/${id}`);
      if (response.status === 200) {
        setPost(response.data.post);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    }
  };

  const handleCommentButtonClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // 댓글 작성 로직 추가
    try {
      const response = await axios.post(`/auth/qnaposts/${id}/comments`, {
        content: commentContent
      });
      
      // 댓글 작성 후의 처리 로직 추가
      
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  return (
    <div className="qna-posted-container">
      {post ? (
        <div className="qna-posted">
          <h2 className="qna-posted-title">{post.title}</h2>
          <p className="qna-posted-info">작성자: {post.name}</p>
          <p className="qna-posted-info">날짜: {post.date}</p>
          <p className="qna-posted-info">조회수: {post.views}</p>
          <p className="qna-posted-content">{post.content}</p>
          <button className="qna-posted-comment-button" onClick={handleCommentButtonClick}>
            댓글 작성
          </button>
        </div>
        
      ) : (
        <p className="qna-posted-loading">게시물을 불러오는 중입니다...</p>
      )}
        {showCommentForm && (
            <form className="qna-posted-comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                className="qna-posted-comment-input"
                placeholder="댓글을 작성해주세요."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button className="qna-posted-comment-submit-button" type="submit">
                작성
              </button>
            </form>
          )}
    </div>
    
  );
}

export default QnaPosted;
