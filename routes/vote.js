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

    const insertVoteDepartmentsSql = 'insert into voteDepartment values(?, ?);';
    allowedDepartments.map( async(departments, index) => {
      await new Promise((resolve, reject) => {
        pool.query(insertVoteDepartmentsSql, [voteCode, departments], (err, results, fields) => {
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
  const voteCode = req.params.voteCode;
  const selectVoteInfoSql = `select title, type, startDate, endDate from vote where voteCode = ?;`;
  const selectcandidatesInfoSql = `select partyNumber, partyimage, partyName, candidateName, promise from candidates where voteCode = ? order by partyNumber;`;

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
      pool.query(selectcandidatesInfoSql, [voteCode], (err, results, fields) => {
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
      } catch (err) {
        console.error(err);
      }
    });
    
    const vote = {
      voteInfo,
      candidatesInfo
    }

    if (voteInfo.length > 0) {
      return res.json(vote);
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
