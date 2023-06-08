const passport = require("passport");
const { Strategy: kakaoStrategy} = require('passport-kakao');
const pool = require('../server/Router/pool');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(new kakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakaoLogin/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    const sql = 'select * from users where snsId = ? and provider = ?;';
    const isUser = await new Promise( (resolve, reject) => {
      pool.query(sql, [profile.id, 'kakao'], (err, results, fields) => {
        if(err) 
          reject(err);
        else 
          resolve(results[0]);
      });
    });
    if(isUser) {
      done(null, isUser);
    } else {
      const min = 100000000;
      const max = 999999999;
      const randomPassword = Math.floor(Math.random() * (max - min + 1)) + min;
      const CreateUserData = {
        studentNumber: profile.id,
        name: profile.displayName,
        dep: "고르지 않음.",
        provider: "kakao",
        password: await bcrypt.hash(randomPassword.toString(), 12),
        telNumber: '',
        snsId: profile.id,
        verificationStatus: "false"
      };

      console.log(CreateUserData);
      
      const insertUserSql = 'INSERT INTO users (studentNumber, name, dep, provider, password, telNumber, snsId, verificationStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const crateUser = await new Promise( (resolve, reject) => {
        pool.query(insertUserSql, 
          [
            CreateUserData.studentNumber, 
            CreateUserData.name,
            CreateUserData.dep,
            CreateUserData.provider,
            CreateUserData.password,
            CreateUserData.telNumber,
            CreateUserData.snsId,
            CreateUserData.verificationStatus,
          ], (err, results, fields) => {
          if(err) 
            return reject(err);
          else 
            return resolve(results);
        });
      })
      const isUser2 = await new Promise( (resolve, reject) => {
        pool.query(sql, [profile.id, 'kakao'], (err, results, fields) => {
          if(err) 
            reject(err);
          else 
            resolve(results[0]);
        });
      });
      done(null, isUser2);
    }
  }))
}