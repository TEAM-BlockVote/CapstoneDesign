  const express = require('express');
  const router = express.Router();
  const pool = require('../server/Router/pool');

  

  router.post('/qnaposts', async (req, res, next) => {
    const { title, content, voteTitle, candidate } = req.body; // voteTitle 값 받음
    console.log('Received voteTitle:', voteTitle); // 로그로 voteTitle 값 출력
  
    if (!title || !content || !candidate) { // 후보자도 체크
      res.status(400).json({ error: '제목과 내용, 후보자를 모두 입력해주세요.' });
      return;
    }
  
    // voteTitle을 그대로 voteName에 저장
    const voteName = voteTitle;
  
    const name = '2019*****'; // 작성자 이름 일단 설정
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const date = `${year}-${month}-${day} ${hours}:${minutes}`;
    const view = 0;
    const insertQuery = 'INSERT INTO qna (title, name, date, view, content, candidate, voteName) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    try {
      await new Promise((resolve, reject) => {
        pool.query(insertQuery, [title, name, date, view, content, candidate, voteName], (err, results, fields) => {
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
  

  async function getVoteNameByCode(voteCode) {
    const selectVoteNameQuery = 'SELECT title FROM vote WHERE voteCode = ?';
  
    try {
      const voteNameResult = await new Promise((resolve, reject) => {
        pool.query(selectVoteNameQuery, [voteCode], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]?.title); // 첫 번째 행의 title 값을 반환
          }
        });
      });
  
      return voteNameResult;
    } catch (error) {
      console.error('투표 이름을 불러오는 중 오류가 발생했습니다.', error);
      return null;
    }
  }


// 게시물 목록 가져오기
router.get('/qnaposts', async (req, res, next) => {
  const page = req.query.page || 1; // 클라이언트에서 전달된 페이지 번호, 기본값은 1
  const perPage = 5; // 페이지당 게시물 수

  try {
    console.log(`Requested page: ${page}`); // 페이지 번호 로그 추가
    const offset = (page - 1) * perPage; // 오프셋 계산
    const selectQuery = `SELECT * FROM qna `; // LIMIT을 사용하여 범위 지정

    // 전체 게시물 수를 가져오는 쿼리 추가
    const countQuery = 'SELECT COUNT(*) as totalCount FROM qna';

    const [tableposts, totalCountResult] = await Promise.all([
      new Promise((resolve, reject) => {
        pool.query(selectQuery, [offset, perPage], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        pool.query(countQuery, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0].totalCount); // 전체 게시물 수 반환
          }
        });
      }),
    ]);

    res.status(200).json({ tableposts, totalCount: totalCountResult });
  } catch (error) {
    console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '게시물을 불러오는 중 오류가 발생했습니다.' });
  }
});




  // 게시물 클릭 시 가져오는 코드
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
  
  router.get('/vote', async (req, res, next) => {
    const selectVotesQuery = 'SELECT voteCode, title, name FROM vote'; 
  
    try {
      const votes = await new Promise((resolve, reject) => {
        pool.query(selectVotesQuery, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    
      if (votes && votes.length > 0) {
        res.status(200).json(votes);
      } else {
        res.status(404).json({ error: '투표 정보를 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('투표 정보를 불러오는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '투표 정보를 불러오는 중 오류가 발생했습니다.' });
    }
    
  });
  
  router.get('/candidates/:selectedVoteTitle', async (req, res, next) => {
    const { selectedVoteTitle } = req.params;
    const selectCandidatesQuery = 'SELECT name FROM vote WHERE title = ?';
  
    try {
      const candidates = await new Promise((resolve, reject) => {
        pool.query(selectCandidatesQuery, [selectedVoteTitle], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            const candidateNames = results.map((row) => row.name);
            resolve(candidateNames);
          }
        });
      });
  
      if (candidates && candidates.length > 0) {
        res.status(200).json({ candidates });
      } else {
        res.status(404).json({ error: '후보자 정보를 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('후보자 정보를 불러오는 중 오류가 발생했습니다.', error);
      res.status(500).json({ error: '후보자 정보를 불러오는 중 오류가 발생했습니다.' });
    }
  });
  
  router.post('/qnaposts/:id/increase-view', async (req, res, next) => {
    const { id } = req.params;
    const updateViewQuery = 'UPDATE qna SET view = view + 1 WHERE id = ?';
  
    try {
      await new Promise((resolve, reject) => {
        pool.query(updateViewQuery, [id], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.status(200).json({ message: '조회수가 증가되었습니다.' });
    } catch (error) {
      console.error('조회수 증가에 실패했습니다.', error);
      res.status(500).json({ error: '조회수 증가에 실패했습니다.' });
    }
  });
  
  

  module.exports = router;

