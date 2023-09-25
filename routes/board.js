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
    const selectVotesQuery = 'SELECT voteCode, title FROM vote'; 
  
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
  

router.get('/candidates/:voteCode', async (req, res, next) => {
  const { voteCode } = req.params;
  
  // 데이터베이스에서 해당 투표의 후보자 정보 검색 (여기서는 partyNumber로 그룹화)
  const selectCandidatesQuery = 'SELECT * FROM candidates WHERE voteCode = ? ORDER BY partyNumber';
  
  try {
    const candidates = await new Promise((resolve, reject) => {
      pool.query(selectCandidatesQuery, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  
    if (candidates && candidates.length > 0) {
      res.status(200).json(candidates);
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
  
  // 클라이언트 측에서 사용자의 dep 값을 전달받는 엔드포인트
router.get('/userDepartment', async (req, res, next) => {
  try {
      // 사용자의 학번을 기반으로 사용자의 dep 정보 조회
      const userDepartmentSql = 'SELECT dep FROM users WHERE studentNumber = ?';
      pool.query(userDepartmentSql, [req.user.studentNumber], (err, results, fields) => {
          if (err) {
              return next(err);
          }
          if (results.length > 0) {
              const userDepartment = results[0].dep;
              // 사용자의 dep 정보를 클라이언트로 전송
              res.json({ department: userDepartment });
          } else {
              res.json({ department: '' }); // 사용자 정보를 찾지 못한 경우 빈 문자열 전송
          }
      });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

// 사용자의 학과와 "ALL" 학과의 voteCode를 가져오는 엔드포인트
router.get('/voteCodeForUserAndAllDepartment', async (req, res, next) => {
  try {
    const userDep = req.user.dep;
    const selectUserVoteCodeSql = 'SELECT voteCode FROM voteDepartment WHERE department = ?';
    const selectAllVoteCodeSql = 'SELECT voteCode FROM voteDepartment WHERE department = "ALL"';
    
    const [userVoteCodes, allVoteCodes] = await Promise.all([
      new Promise((resolve, reject) => {
        pool.query(selectUserVoteCodeSql, [userDep], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            // 사용자 학과의 voteCode를 가져옴
            const userVoteCodes = results.map((row) => row.voteCode);
            resolve(userVoteCodes);
          }
        });
      }),
      new Promise((resolve, reject) => {
        pool.query(selectAllVoteCodeSql, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            // "ALL" 학과의 voteCode를 가져옴
            const allVoteCodes = results.map((row) => row.voteCode);
            resolve(allVoteCodes);
          }
        });
      }),
    ]);
    
    // 사용자 학과와 "ALL" 학과의 voteCode를 클라이언트로 전송
    res.json({ userVoteCodes, allVoteCodes });
  } catch (error) {
    console.error(error);
    next(error);
  }
});




  

  module.exports = router;

