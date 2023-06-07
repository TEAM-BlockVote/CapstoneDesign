import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QnaPosted.css';

function QnaPosted() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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

  return (
    <div className="qna-posted-container">
      {post ? (
        <div className="qna-posted">
          <h2 className="qna-posted-title">{post.title}</h2>
          <p className="qna-posted-info">작성자: {post.name}</p>
          <p className="qna-posted-info">날짜: {post.date}</p>
          <p className="qna-posted-info">조회수: {post.views}</p>
          <p className="qna-posted-content">{post.content}</p>
        </div>
      ) : (
        <p className="qna-posted-loading">게시물을 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default QnaPosted;
