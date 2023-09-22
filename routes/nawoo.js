const express = require('express');
const fs = require('fs');
const path = require('path'); 
const router = express.Router();
const pool = require('../server/Router/pool');

router.get('/voteList', async (req, res, next) => {
  try {
    const VoteListSql = 'SELECT * FROM vote WHERE voteCode IN (SELECT voteCode FROM voteDepartment WHERE department = ?)';
    const voteList = await new Promise((resolve, reject) => {
      pool.query(VoteListSql, [req.user.dep], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    res.json(voteList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/CategorySelects/:voteCode', async (req, res, next) => {
  const voteCode = req.params.voteCode;
  try {
    const selectCategories = "select voteCode, category, candidateNumber, promise from categories where voteCode = ?;";
    const categories = await new Promise((resolve, reject) => {
      pool.query(selectCategories, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const selectCandidatesInfoSql = `select partyNumber, partyimage, partyName, candidateName, promise from candidates where voteCode = ? order by partyNumber;`;
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
      } catch (err) {
        console.error(err);
      }
    });

    const categoriesData = {};
    categories.map((item, index) => {
      if (!categoriesData[item.category]) {
        categoriesData[item.category] = [];
      }
      categoriesData[item.category].push({
        candidateNumber: item.candidateNumber,
        promise: item.promise
      });
    });
    const nawooData = {
      categoriesData,
      candidatesInfo
    };
    
    res.json(nawooData);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
