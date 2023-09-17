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

// 사용자의 학과 정보를 기반으로 사용자가 접근 가능한 voteCode를 가져오는 엔드포인트
router.get('/voteCodeForUser', async (req, res, next) => {
  try {
    const userDep = req.user.dep;
    const voteCodeSql = 'SELECT voteCode FROM voteDepartment WHERE department = ?';
    pool.query(voteCodeSql, [userDep], (err, results, fields) => {
      if (err) {
        return next(err);
      }
      const voteCodes = results.map((row) => row.voteCode);
      res.json({ voteCodes });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get('/allDepartmentVotes', async (req, res, next) => {
  try {
    // "ALL" 부서의 voteCode를 가져오는 쿼리
    const selectVoteCodesQuery = 'SELECT voteCode FROM votedepartment WHERE department = "ALL"';
    
    const voteCodes = await new Promise((resolve, reject) => {
      pool.query(selectVoteCodesQuery, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          // voteCodes 배열에 voteCode를 담음
          const voteCodes = results.map((result) => result.voteCode);
          resolve(voteCodes);
        }
      });
    });
    
    if (voteCodes && voteCodes.length > 0) { // voteCodes가 비어있지 않은 경우에만 진행
      // 모든 "ALL" 부서의 voteCode를 가져옴
      const votePromises = voteCodes.map((voteCode) => {
        // 각 voteCode로 투표 정보를 가져오는 비동기 작업 생성
        return new Promise((resolve, reject) => {
          const selectVoteQuery = 'SELECT * FROM vote WHERE voteCode = ?';
          pool.query(selectVoteQuery, [voteCode], (err, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        });
      });

      // 모든 투표 정보를 병렬로 가져오기
      const voteInfos = await Promise.all(votePromises);

      // 투표 정보를 사용하여 버튼 생성
      const voteButtons = voteInfos.map((voteInfo) => {
        if (voteInfo && voteInfo.voteCode) { // voteInfo 객체와 voteCode 속성이 정의되어 있는지 확인
          return {
            voteCode: voteInfo.voteCode,
            title: voteInfo.title,
          };
        }
        return null; // voteCode 속성이 없는 경우 null 반환
      });

      // null이 아닌 요소만 필터링하여 반환
      const validVoteButtons = voteButtons.filter((button) => button !== null);

      res.status(200).json(validVoteButtons);
    } else {
      res.status(404).json({ error: '투표 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('투표 정보를 불러오는 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '투표 정보를 불러오는 중 오류가 발생했습니다.' });
  }
});



  

  module.exports = router;

