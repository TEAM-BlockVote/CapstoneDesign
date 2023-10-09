const express = require('express');
const router = express.Router();
const pool = require('../server/Router/pool');
const CryptoJS = require("crypto-js");
const axios = require('axios');

function send_message(phone, voteCode) {
  var user_phone_number = phone;//수신 전화번호 기입
  var resultCode = 404;
  const date = Date.now().toString();
  const uri = process.env.SERVICE_ID; //서비스 ID
  const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
  const accessKey = process.env.NCP_KEY;//Access Key
  const my_number = process.env.NCP_MYNUM;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  axios({
    method: method,
    url: url,
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: {
      type: "SMS",
      countryCode: "82",
      from: my_number,
      content: `[BlockVote-전자투표] http://52.78.93.185/voting?voteCode=${voteCode}`,
      messages: [
        { to: `${user_phone_number}`, },],
    },
  }).then(res => {
    resultCode = 200;
  }).catch(err => {
    console.log(err);
  })
  return resultCode;
}

router.get('/user', async (req, res, next) => {
  const telNumberSelectSql = "select studentNumber, name, dep, telNumber from users";
  const users = await new Promise((resolve, reject) => {
    pool.query(telNumberSelectSql, [], (err, results, fields) => {
      if (err) {
        reject(err);
      }
      else
        resolve(results);
    });
  });

  const voteListSql = "SELECT voteCode, title FROM vote";
  const voteList = await new Promise((resolve, reject) => {
    pool.query(voteListSql, [], (err, results, fields) => {
      if (err) {
        reject(err);
      }
      else
        resolve(results);
    });
  });

  const data = {
    users,
    voteList
  }
  res.json(data);
});

router.post('/sendSms', async (req, res, next) => {
  const telNumbers = req.body.telNumbers;
  const voteCode = req.body.voteCode;
  try {
    telNumbers.forEach(async(telNumber, i) => {
      await send_message(telNumber, voteCode);
    })

    res.sendStatus(200);
  } catch (error) {
    console.error('핸드폰 번호 불러오는중 오류발생', error);
    res.status(500).json({ error: '핸드폰 번호 불러오는중 오류발생' });
  }
});

module.exports = router
