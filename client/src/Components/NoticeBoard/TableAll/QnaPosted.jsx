import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QnaPosted.css';

function QnaPosted() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [receivedComments, setReceivedComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    axios.get(`/board/receivedComments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setReceivedComments(response.data);
        } else {
          console.error('게시물을 불러오는 데 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('게시물을 불러오는 데 실패했습니다.', error);
      });
  }, [receivedComments]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/board/qnaposts/${id}`);
      if (response.status === 200) {
        setPost(response.data.post);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentContent === '') return alert("댓글을 작성해주세요");
    setCommentContent('');

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('요청이 타임아웃되었습니다.');
    }, 2000);

    try {
      const response = await axios.post(`/board/qnaposts/${id}/comments`, {
        content: commentContent
      });
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  return (
    <div className="qna-posted-container">
      {post ? (
        <>
          <div className="qna-posted">
            <h2 className="qna-posted-title">{post.title}</h2>
            <p className="qna-posted-info">작성자: {post.name}</p>
            <p className="qna-posted-info">날짜: {post.date}</p>
            <p className="qna-posted-info">조회수: {post.view}</p>
            <p className="qna-posted-content">{post.content}</p>
          </div>

          <form className="qna-posted-comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="qna-posted-comment-input"
              placeholder="댓글을 작성해주세요."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button className="qna-posted-comment-submit-button" type="submit" disabled={isLoading}>
              작성
            </button>
          </form>
          <div>
            <div>
            </div>
            {receivedComments && receivedComments.map((element, index) => (
              <div className='qna-posted-comment'>
                <div key={index}>
                  {element.studentNumber}
                </div>
                <div>
                  {element.text}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="qna-posted-loading">게시물을 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default QnaPosted;
