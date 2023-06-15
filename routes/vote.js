const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');

router.post('/write', async (req, res, next) => {

  const { title, type, startDate, endDate } = req.body;
  const writer = String(req.user.name);
          
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const makeDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const voteCode = String(Math.floor(Math.random() * 9999999 + 1111111));
  
  const name = '홍길동';
  const text = '학교 운동장 잔디 설치'
  const insertVoteSql = 'INSERT INTO vote (title, writer, type, startDate, endDate, name, text, makeDate, voteCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const voteUser = await new Promise((resolve, reject) => {
      pool.query(insertVoteSql, [title, writer, type, startDate, endDate, name, text, makeDate, voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  };
  return res.redirect('/AdminMain');
});

router.get('/view', async (req, res, next) => {

  const selectVoteSql = 'select * from vote';
  try {
    const voteUser = await new Promise((resolve, reject) => {
      pool.query(selectVoteSql, [], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    if (voteUser.length > 0) {
      res.send(voteUser);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.get('/hasVoteNumberVoting', async (req, res, next) => {
  const voteCode = req.query.voteCode;
  const selectvoteCodeSql =  'select * from vote where voteCode = ?';

  try {
    const hasVoteCode  = await new Promise((resolve, reject) => {
      pool.query(selectvoteCodeSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    if (hasVoteCode.length > 0) {
      return res.redirect(`/voting?voteCode=${voteCode}`)
    } else {
      return res.send("<script>alert('존재하지 않는 번호입니다 다시 확인해주세요');location.href='/';</script>");
    }
  } catch (error) {
    console.log(error);
    next(error);
  };

  console.log("hasVoteNumberVoting");
});

router.get('/:voteCode', async (req, res, next) => {
  const promiseArr = [
    [
      '학생회관 구축',
      '시험기간 도서관 24시간 개방',
      '학생식당 가격인하 및 품질개선',
      '분기 별 학생간담회 개최',
    ],
    [
      '각 건물 편의시설 및 휴게 공간',
      '축제, 체육대회등 다양한 행사 재개',
      '교내 냉, 낭방 시설 최적화',
      '교내 건의함 설치',
    ],
    [
     '교내 주차장 확대',
     '샤워실, 체육관, 상시 이용',
     '셔틀버스 운영시간 및 노선 확대',
     '총학생회 홈페이지 및 sns 활성화',
    ],
    [
     '졸업앨범 재시행',
     '취업박람회 추진',
     '취업 지원 프로그램 확대 ',
     '다양한 현장 실습 기회 확대',
    ]
  ]

  const voteCode = req.params.voteCode;
  const selectvoteCodeSql =  'select * from vote where voteCode = ?';
  const selectcandidates =  'select * from candidates';
  try {
    const hasVoteInfo  = await new Promise((resolve, reject) => {
      pool.query(selectvoteCodeSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    let candidates  = await new Promise((resolve, reject) => {
      pool.query(selectcandidates, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    candidates.map((ele, i) => {
      ele.promise = promiseArr[i];
    });

    const votinfInfo = {
      hasVoteInfo,
      candidates
    };

    if (hasVoteInfo.length > 0) {
      return res.json(votinfInfo);
    } else {
      res.status(404).json({ error: '투표를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  };

  console.log("hasVoteNumberVoting");
});

module.exports = router;
