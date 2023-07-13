const passport = require("passport");
const { Strategy: kakaoStrategy} = require('passport-kakao');
const pool = require('../server/Router/pool');
const bcrypt = require('bcrypt');
const web3 = require('web3');
const sendEther = require('../payment/sendPayment');

module.exports = () => {
  passport.use(new kakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakaoLogin/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    const sql = 'select * from users where snsId = ? and provider = ?;';
    const checkUser = async() => {
      try {
        const queryResult = await new Promise( (resolve, reject) => {
          pool.query(sql, [profile.id, 'kakao'], (err, results, fields) => {
            if(err) 
              reject(err);
            else 
              resolve(results[0]);
          });
        });
        // console.log(queryResult);
        return queryResult;
      } catch (error) {
        console.log(error);
      }
    };

  try {
    const user = await checkUser();
    // console.log(user);
    if(user) {
      done(null, user);
    } else {
      const min = 100000000;
      const max = 999999999;
      const privateKey = await web3.eth.accounts.create().privateKey;
      const address = await web3.eth.accounts.privateKeyToAccount(privateKey).address;
      const randomPassword = Math.floor(Math.random() * (max - min + 1)) + min;
      const CreateUserData = {
        studentNumber: profile.id,
        name: profile.displayName,
        dep: "고르지 않음.",
        provider: "kakao",
        password: await bcrypt.hash(randomPassword.toString(), 12),
        telNumber: '',
        snsId: profile.id,
        verificationStatus: "false",
        walletAddr: address,
        walletPrivateKey: privateKey,
      };
      
      const insertUserSql = 'INSERT INTO users (studentNumber, name, dep, provider, password, telNumber, snsId, verificationStatus, walletAddr, walletPrivateKey) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const createUser = await new Promise( (resolve, reject) => {
        pool.query(
          insertUserSql,
          [
            CreateUserData.studentNumber,
            CreateUserData.name,
            CreateUserData.dep,
            CreateUserData.provider,
            CreateUserData.password,
            CreateUserData.telNumber,
            CreateUserData.snsId,
            CreateUserData.verificationStatus,
            CreateUserData.walletAddr,
            CreateUserData.walletPrivateKey,
          ],
          (err, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
      const user = await checkUser();
      sendEther(user);
      done(null, user);
    }    
  } catch (error) {
    console.log(error);
  }
  }))
};
