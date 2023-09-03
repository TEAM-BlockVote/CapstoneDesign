const express = require('express');
const fs = require('fs');
const pool = require('../server/Router/pool');
const { abi } = require('../artifacts/contracts/Voting.sol/Voting.json')
const router = express.Router();
const { categoryGeneratorService } = require('../service/categoryGeneratorService');

router.post('/write', async (req, res, next) => {
  // const { imageData } = req.body;

  // if (!imageData) {
  //   return res.status(400).json({ error: 'Image data missing' });
  // }

  // const imageBuffer = Buffer.from(imageData, 'base64');
  // const imagePath = path.join(__dirname, 'uploads', 'image.png');

  // fs.writeFile(imagePath, imageBuffer, (err) => {
  //   if (err) {
  //     return res.status(500).json({ error: 'Error saving image' });
  //   }
  //   return res.json({ message: 'Image uploaded successfully' });
  // });
  
  const { title, type, startDate, endDate } = req.body.voteInfoData;  
  const writer = String(req.user.name);
          
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const makeDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const voteCode = String(Math.floor(Math.random() * 9000000) + 1000000);
  
  const insertVoteSql = 'INSERT INTO vote (title, writer, type, startDate, endDate, makeDate, voteCode) VALUES (?, ?, ?, ?, ?, ?, ?)'; // create로 바꿔야하지 않나?

  try {
    const candidateList = [1, 2, 3, 4];
    const gasPrice = await req.web3.eth.getGasPrice();
    const gasLimit = 150000; // 필요한 가스 양에 따라 조정합니다
    const userAccount = req.web3.eth.accounts.privateKeyToAccount(req.user.walletPrivateKey);
    req.web3.eth.accounts.wallet.add(userAccount);

    const contractInstance = new req.web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, { from: req.user.walletAddr });
    contractInstance.methods.createVote(voteCode, candidateList).send({ gasPrice, gas: gasLimit });

    // const result22 = await contractInstance.methods.getVoteList(voteCode).call();
    // console.log(`검색하신 투표 번호: ${voteCode}`)
    // console.log(result22);

    const voteCreate = await new Promise((resolve, reject) => {
      pool.query(insertVoteSql, [title, writer, type, startDate, endDate, makeDate, voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });
    
    const insertCandidatesSql = 'INSERT INTO candidates (voteCode, partyName, partyNumber, candidateName, promise, partyimage) VALUES (?, ?, ?, ?, ?, ?)';
    const promises = req.body.candidateInfo.map((candidate, index) => {
      return new Promise((resolve, reject) => {
        pool.query(insertCandidatesSql, [voteCode, candidate.partyName, candidate.partyNumber, candidate.candidateNames.join(';'), candidate.promises.join(';'), Math.floor(Math.random() * 9000000)], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  };
  return res.json({status: 200});
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
});

router.post("/voting", async(req, res, next) => {
  const candidateId = parseInt(req.body.selectedCandidatedata)+1;
  const voteCode = req.body.voteCode;

  console.log(typeof voteCode, typeof candidateId);
  console.log(req.user.walletAddr);
  console.log(voteCode, candidateId);
  const votesUpdateSql = "update candidates set votes = votes + 1 where id = ?"
  const gasPrice = await req.web3.eth.getGasPrice();
  const gasLimit = 300000; // 필요한 가스 양에 따라 조정합니다
  const contractInstance = new req.web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, { from: req.user.walletAddr });
  const userAccount = req.web3.eth.accounts.privateKeyToAccount(req.user.walletPrivateKey);
  req.web3.eth.accounts.wallet.add(userAccount);

  // const result22 = await contractInstance.methods.getVoteList("5745409").call();
  // console.log(`검색하신 투표 번호: ${voteCode}`)
  // console.log(result22);

  
  // const result123 = await contractInstance.methods.submitVote("5745409", candidateId).send({ gasPrice, gas: gasLimit });
  // console.log(result123);
  // contractInstance.methods.submitVote(voteCode, candidateId+1).send({ gasPrice, gas: gasLimit });
  // console.log(voingResult);



  try {
    const hasVoteInfo  = await new Promise((resolve, reject) => {
      pool.query(votesUpdateSql, [candidateId+1], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });
    if(hasVoteInfo.changedRows === 0) {
      res.status(404).json({ error: '투표중 오류발생' });
    } else {
      res.status(200).json({ post: '성공' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.post('/candidates', async (req, res, next) => {
  const voteCode = parseInt(req.body.voteCode);
  console.log(voteCode);
  const selectCandidatesSql = 'select vote.voteCode, partyName, candidateName, promise from vote  LEFT OUTER JOIN candidates on vote.voteCode = candidates.voteCode where vote.voteCode = ?';

  try {
    const candidates = await new Promise((resolve, reject) => {
      pool.query(selectCandidatesSql, [voteCode], (err, results, fields) => {
        if (err) {
          console.error('후보자 명단을 가져오는데 에러가 발생했습니다. vots.js');
        }
        else
          resolve(results);
      });
    });
    res.send(candidates);
  } catch (error) {
    console.log(error);
    next(error);
  };
});

module.exports = router;
