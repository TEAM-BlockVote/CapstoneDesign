const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');

router.post('/write', async (req, res, next) => {

  const { title, type, startDate, endDate } = req.body;
  const writer = String(req.user.name);
  const name = '홍길동';
  const text = '학교 운동장 잔디 설치'
  const insertVoteSql = 'INSERT INTO vote (title, writer, type, startDate, endDate, name, text) VALUES (?, ?, ?, ?, ?, ?, ?)';

  console.log(req.body);
  console.log(req.user.name);

  try {
    const voteUser = await new Promise((resolve, reject) => {
      pool.query(insertVoteSql, [title, writer, type, startDate, endDate, name, text] , (err, results, fields) => {
        if (err)
          reject(err);
        else
          resolve(results);
      });
    });
  } catch (error) {
    next(error);
  };
  return res.redirect('http://localhost:3000/AdminMain');
});


router.get('/view', async (req, res, next) => {

  const selectVoteSql = 'select * from vote';


  try {
    const voteUser = await new Promise((resolve, reject) => {
      pool.query(selectVoteSql, [] , (err, results, fields) => {
        if (err)
          reject(err);
        else
          resolve(results);
      });
    });
    console.log(voteUser);

    if(voteUser.length > 0) {
      res.send(voteUser);
    } else {
      res.send(false);
    }
  } catch (error) {
    next(error);
  };
});

module.exports = router;
