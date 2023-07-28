  const express = require('express');
  const router = express.Router();
  const pool = require('../server/Router/pool');

  const candidateMap = {
    "후보자 1": 1,
    "후보자 2": 2,
    "후보자 3": 3
  };

  router.post('/qnaposts', async (req, res, next) => {
    const { title, content, candidate } = req.body;

    if (!title || !content || !candidate) {
      res.status(400).json({ error: '제목과 내용, 후보자를 모두 입력해주세요.' });
      return;
    }

    const candidateNumber = candidateMap[candidate];

    if (!candidateNumber) {
      res.status(400).json({ error: '유효한 후보자를 선택해주세요.' });
      return;
    }
    
    const name = '2019*****'; // 작성자 이름 일단 설정 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const date = `${year}-${month}-${day} ${hours}:${minutes}`;
    const view = 128; // 조회수를 128으로 초기화
    const insertQuery = 'INSERT INTO qna (title, name, date, view, content, candidate) VALUES (?, ?, ?, ?, ?, ?)';

    try {
      await new Promise((resolve, reject) => {
        pool.query(insertQuery, [title, name, date, view, content, candidateNumber], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      res.status(200).json({ message: '글 작성이 완료되었습니다.' });
    } catch (error) {
      console.error('글 작성 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '글 작성 중 오류가 발생했습니다.' });
    }
  });

  // 게시물 목록을 가져오는 API
  router.get('/qnaposts', async (req, res, next) => {
    const selectQuery = 'SELECT * FROM qna';

    try {
      const tableposts = await new Promise((resolve, reject) => {
        pool.query(selectQuery, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      res.status(200).json({ tableposts });
    } catch (error) {
      console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
    }
  });

  // 게시물을 가져오는 API
  router.get('/qnaposts/:id', async (req, res, next) => {
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM qna WHERE id = ?';

    try {
      const tablepost = await new Promise((resolve, reject) => {
        pool.query(selectQuery, [id], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      });

      if (tablepost) {
        res.status(200).json({ post: tablepost });
      } else {
        res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
    }
  });

  router.post('/qnaposts/:id/comments', async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const text = req.body.content;
    const insertComment = 'INSERT INTO comment VALUES (?, ?, ?)';

    try {
      const formComment = await new Promise((resolve, reject) => {
        pool.query(insertComment, [id, text, req.user.studentNumber], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      console.error('댓글을 저장하는 중 오류 발생.', error);
      res.status(500).json({ error: '댓글을 저장하는 중 오류 발생.' });
    }
  });

  router.get('/receivedComments/:id', async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const receivedCommentsSql = 'select * from comment where id = ?';

    try {
      const receivedComments = await new Promise((resolve, reject) => {
        pool.query(receivedCommentsSql, [id], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      res.json(receivedComments);
    } catch (error) {
      console.error('댓글 불러오는중 에러 발생.', error);
      res.status(500).json({ error: '댓글 불러오는중 에러 발생.' });
    }
  });

  router.get('/qnaposts/candidate/:candidate', async (req, res, next) => {
    const { candidate } = req.params;
    const selectQuery = 'SELECT * FROM qna WHERE candidate = ?';
  
    try {
      const tableposts = await new Promise((resolve, reject) => {
        pool.query(selectQuery, [candidate], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      if (tableposts.length > 0) {
        res.status(200).json({ tableposts });
      } else {
        res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
    }
  });
  

  module.exports = router;
