const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');

router.post('/write', async (req, res, next) => {

  const { title, type, startDate, endDate } = req.body;
  const writer = String(req.user.name);
  const makeDate = new Date().toISOString().replace('T', ' ').substr(0, 16);
  const name = '홍길동';
  const text = '학교 운동장 잔디 설치'
  const insertVoteSql = 'INSERT INTO vote (title, writer, type, startDate, endDate, name, text, makeDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const voteUser = await new Promise((resolve, reject) => {
      pool.query(insertVoteSql, [title, writer, type, startDate, endDate, name, text, makeDate], (err, results, fields) => {
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

module.exports = router;
