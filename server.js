const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

app.use(cors());
dotenv.config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});
redisClient.connect().then();

const pool = require('./server/Router/pool');
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');

passportConfig();
app.use(express.json()); // 제아슨 요청
app.use(express.urlencoded({ extended: true})); //폼요청
app.use(cookieParser(process.env.COOKIE_SECRET)); //세션쿠키객체.
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient }),
}));

app.set('port', process.env.PORT || 5000);
app.use(passport.initialize()); //로그인에 필요한 객체 자동 생성.
app.use(passport.session()); //connect.sid 라는 이르으로 세션 쿠기가 브라우저로 전송.

app.use('/auth', authRouter);

app.get("/api", (req, res) => {
  const sql = 'select * from user';
  pool.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error while fetching data from MySQL database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  })
});

app.get('/test', (req, res, next) => {
  console.log(req.body);
})

app.get("/api22", (req, res) => {
  const sql = 'select id from user';
  pool.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error while fetching data from MySQL database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  })
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중 ');
});
