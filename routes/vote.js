const express = require('express');
const fs = require('fs');
const path = require('path'); 
const pool = require('../server/Router/pool');
const { abi } = require('../artifacts/contracts/Voting.sol/Voting.json')
const router = express.Router();
const { categoryGeneratorService } = require('../service/categoryGeneratorService');

router.post('/write', async (req, res, next) => {  
  const { title, type, startDate, endDate, allowedDepartments } = req.body.voteInfoData;
  
  const writer = String(req.user.name);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const makeDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const voteCode = String(Math.floor(Math.random() * 9000000) + 1000000);

  try {
    const candidateList = req.body.candidateInfo.map(item => item.partyNumber);
    const contractInstance = new req.web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, { from: req.user.walletAddr });
    const gasPrice = await req.web3.eth.getGasPrice();
    const gasLimit = 5000000;
    const userAccount = req.web3.eth.accounts.privateKeyToAccount(req.user.walletPrivateKey);
    req.web3.eth.accounts.wallet.add(userAccount);
    await contractInstance.methods.createVote(voteCode, candidateList).send({ gasPrice, gas: gasLimit });

    const createVoteSql = 'INSERT INTO vote (title, writer, type, startDate, endDate, makeDate, voteCode) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await new Promise((resolve, reject) => {
      pool.query(createVoteSql, [title, writer, type, startDate, endDate, makeDate, voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    const insertAllowedVoteDepartmentsSql = 'insert into voteDepartment values(?, ?);';
    allowedDepartments.map( async(departments, index) => {
      await new Promise((resolve, reject) => {
        pool.query(insertAllowedVoteDepartmentsSql, [voteCode, departments], (err, results, fields) => {
          if (err) {
            reject(err);
          }
          else
            resolve(results);
        });
      });
    })
    
    const insertInitVotingResultsSql = 'insert into votingResults(voteCode, partyNumber, lastUpdate) values(?, ?, ?)';
    candidateList.map( async(candidateNumber, index) => {
      await new Promise((resolve, reject) => {
        pool.query(insertInitVotingResultsSql, [voteCode, candidateNumber, makeDate], (err, results, fields) => {
          if (err) {
            reject(err);
          }
          else
            resolve(results);
        });
      });
    })
    
    const insertCandidatesSql = 'INSERT INTO candidates (voteCode, partyName, partyNumber, candidateName, promise, partyimage) VALUES (?, ?, ?, ?, ?, ?)';
    const promises = req.body.candidateInfo.map((candidate, index) => {
      let base64Data = req.body.candidateInfo[index].imagePreview.replace(/^data:image\/\w+;base64,/, '');
      let binaryData = Buffer.from(base64Data, 'base64');
      let uploadDirRelative = '../uploads';
      let candidateImageFileName = `${voteCode}_${candidate.partyNumber}.png`;
      let imagePathRelative = path.join(uploadDirRelative, candidateImageFileName);
      let imagePath = path.join(__dirname, imagePathRelative);
      fs.writeFile(imagePath, binaryData, (err) => {
        if (err) console.error(err);
      });
      return new Promise((resolve, reject) => {
        pool.query(insertCandidatesSql, [voteCode, candidate.partyName, candidate.partyNumber, candidate.candidateNames.join(';'), candidate.promises.join(';'), candidateImageFileName], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
    Promise.all(promises)
    .then(() => {
      console.log("completed");
      categoryGeneratorService(voteCode);
    })
    .catch((err) => {
      console.error("candidate insert error:", err);
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
      res.status(500).send('비어있음!');
    }
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.get('/hasVoteNumberVoting', async (req, res, next) => {
  try {
    const voteCode = req.query.voteCode;
    const voteSql =  'select * from vote where voteCode = ?';
    const vote  = await new Promise((resolve, reject) => {
      pool.query(voteSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });
    
    if (vote.length > 0) {
      const currentDate = new Date();
      const startDate = new Date(vote[0].startDate + 'T09:00:00');
      const endDate = new Date(vote[0].endDate + 'T18:00:00');
      if(currentDate >= startDate && currentDate <= endDate) {
        if(req.query.type === 'voting') 
          return res.redirect(`/voting?voteCode=${voteCode}`)
        else if(req.query.type === 'graph')
          return res.redirect(`/Graph/${voteCode}`)
      }
      else
        return res.send("<script>alert('투표시간을 확인 해주세요');location.href='/';</script>");  
    } else {
      return res.send("<script>alert('존재하지 않는 번호입니다 다시 확인해주세요');location.href='/';</script>");
    }
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.get('/:voteCode', async (req, res, next) => {
  const voteCode = req.params.voteCode;
  const selectVoteInfoSql = `select title, type, startDate, endDate from vote where voteCode = ?;`;
  const selectCandidatesInfoSql = `
    SELECT
      v.voteCode,
      v.partyNumber,
      c.partyimage,
      c.partyName,
      c.candidateName,
      v.votes,
      v.lastUpdate
    FROM
      votingResults v
    INNER JOIN
      candidates c
    ON
      v.voteCode = c.voteCode AND v.partyNumber = c.partyNumber
    WHERE
      v.voteCode = ?
    ORDER BY c.partyNumber;
  `;

  try {
    const voteInfo = await new Promise((resolve, reject) => {
      pool.query(selectVoteInfoSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    const candidatesInfo = await new Promise((resolve, reject) => {
      pool.query(selectCandidatesInfoSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });

    candidatesInfo.map((candidate, index) => {
      let imagePath = `../uploads/${candidate.partyimage}`;
      try {
        const data = fs.readFileSync(path.join(__dirname, imagePath));
        const base64ImageData = Buffer.from(data).toString('base64');
        candidate.partyimage = `data:image/png;base64,${base64ImageData}`;

        const date = new Date(candidate.lastUpdate);
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        candidate.lastUpdate = `${day}일${hours}시${minutes}분${seconds}초`;
      } catch (err) {
        console.error(err);
      }
    });
    
    const vote = {
      voteInfo,
      candidatesInfo
    }

    if (voteInfo.length > 0) {
      const currentDate = new Date();
      const startDate = new Date(voteInfo[0].startDate + 'T09:00:00');
      const endDate = new Date(voteInfo[0].endDate + 'T18:00:00');
      return currentDate >= startDate && currentDate <= endDate ? res.json(vote) : res.status(707).json({ error: '투표 시간 아님' });
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

  try{
    const gasPrice = await req.web3.eth.getGasPrice();
    const gasLimit = 150000; // 필요한 가스 양에 따라 조정합니다
    const contractInstance = new req.web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, { from: req.user.walletAddr });
    
    const userAccount = req.web3.eth.accounts.privateKeyToAccount(req.user.walletPrivateKey);
    const isUser = req.web3.eth.accounts.wallet.some((wallet) => (
      wallet.address === userAccount.address
    ))
    
    if(!isUser) req.web3.eth.accounts.wallet.add(userAccount);
    await contractInstance.methods.submitVote(voteCode, candidateId).send({ gasLimit, gas: gasPrice });
    
    const votingDepartment = "insert into votingByDepartment(voteCode, department, voteTimeStamp) values(?, ?, NOW())";
    await new Promise((resolve, reject) => {
      pool.query(votingDepartment, [voteCode, req.user.dep], (err, results, fields) => {
        if (err) {
          reject(err);
        }
        else
          resolve(results);
      });
    });
    res.status(200).send('투표성공');
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.post('/candidates', async (req, res, next) => {
  const voteCode = parseInt(req.body.voteCode);
  
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
