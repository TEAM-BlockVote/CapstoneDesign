const express = require('express');
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

router.get('/CategorySelect/:voteCode', async (req, res, next) => {
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
    const data = {};

    categories.map((item, index) => {
      if (!data[item.category]) {
        data[item.category] = [];
      }
      data[item.category].push({
        candidateNumber: item.candidateNumber,
        promise: item.promise
      });
    });
    
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
