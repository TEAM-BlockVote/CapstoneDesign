const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');

router.get('/voteList', async (req, res, next) => {
  const userDepartment = req.user.dep;

  try {
    const VoteListSql = 'SELECT * FROM vote WHERE voteCode IN (SELECT voteCode FROM voteDepartment WHERE department = ?)';
    
    console.log('User Department:', userDepartment);
    
    const voteList = await new Promise((resolve, reject) => {
      pool.query(VoteListSql, [userDepartment], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const voteCode = voteList.map((vote, index) => {
      return vote.voteCode; 
    })

    const voteInfo = {
      voteList
    };
    
    const selectCategories = "select voteCode, category, candidateNumber, promise from categories where voteCode = ?;";
    const categories = voteCode.map( async(voteCode, index) => {
      return await new Promise((resolve, reject) => {
        pool.query(selectCategories, [voteCode], (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    })
    Promise.all(categories)
    .then((res) => {
      console.log(res);
      res.forEach(categoryData => {
        categoryData.forEach(item => {
          if (!voteInfo.categories[item.category]) {
            voteInfo.categories[item.category] = [];
          }
          // 이미 존재하는 카테고리에 데이터를 추가합니다.
          voteInfo.categories[item.category].push({
            candidateNumber: item.candidateNumber,
            promise: item.promise
          });
        });
      });

      console.log(voteInfo);
    })
    .catch((err) => {
      //에러처리 나중에
    })
    
    res.send(voteList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;