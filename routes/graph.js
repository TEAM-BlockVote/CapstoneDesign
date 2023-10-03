const express = require('express');
const pool = require('../server/Router/pool');
const router = express.Router();

router.get('/voteInfo/:voteCode', async (req, res, next) => {
  const voteCode = req.params.voteCode;
  console.log(voteCode);
  try {
    const voteInfoSql = 'SELECT title, startDate, endDate FROM vote WHERE voteCode = ?';
    const voteInfo = await new Promise((resolve, reject) => {
      pool.query(voteInfoSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    const pieGraphDataSql = `
      SELECT
        v.partyNumber,
        c.partyName,
        c.candidateName,
        v.votes
      FROM
        votingResults v
      INNER JOIN
        candidates c
      ON
        v.voteCode = c.voteCode AND v.partyNumber = c.partyNumber
      WHERE
        v.voteCode = ?
      ORDER BY c.partyNumber`;
    const pieGraphData = await new Promise((resolve, reject) => {
      pool.query(pieGraphDataSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const lineGraphDataSql = 'select voteCode, department, voteTimeStamp from votingByDepartment where voteCode = ?';
    const lineGraphData = await new Promise((resolve, reject) => {
      pool.query(lineGraphDataSql, [voteCode], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    
    const vote = {
      pieGraphData,
      voteInfo,
      lineGraphData
    };

    return res.send(vote);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;