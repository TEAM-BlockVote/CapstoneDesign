const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');

router.get('/user/:studentNumber', async (req, res, next) => {
  const studentNumber = req.params.studentNumber;
  try {
    const userSql = 'SELECT studentNumber, name, dep, telNumber FROM users WHERE studentNumber = ?';
    const user = await new Promise((resolve, reject) => {
      pool.query(userSql, [studentNumber], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    user.length === 1 ? res.json(user) : res.sendStatus(300);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
