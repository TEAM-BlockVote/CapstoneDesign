const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);
const schedule = require('node-schedule');
const path = require('path');
const { Web3 } = require('web3');

app.use(cors());
dotenv.config();

// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true,
// });
// redisClient.connect().then();

const web3 = new Web3(process.env.INFURA_API);
const adminWallet = web3.eth.accounts.privateKeyToAccount(process.env.METAMASK_PRIVATE_KEY);
web3.eth.accounts.wallet.add(adminWallet);
web3.adminWallet = adminWallet;
const pool = require('./server/Router/pool');
const authRouter = require('./routes/auth');
const voteRouter = require('./routes/vote');
const boardRouter = require('./routes/board');
const smsRouter = require('./routes/sms');
const passportConfig = require('./passport');
const nawooRouter = require('./routes/nawoo');
const graphRouter = require('./routes/graph');
const scanRouter = require('./routes/scan');
const { updateVoteDataScheduler } = require('./scheduler/updateVoteDataScheduler');
const { abi } = require('./artifacts/contracts/Voting.sol/Voting.json');

passportConfig();
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error("uploads 폴더가 없습니다. uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET)); //세션쿠키객체.
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // store: new RedisStore({ client: redisClient }),
}));
app.use((req, res, next) => {
  req.web3 = web3;
  next();
})

app.use(express.static(path.join(__dirname, "/client/build")));
app.set('port', process.env.PORT || 5000);
app.use(passport.initialize()); //로그인에 필요한 객체 자동 생성.
app.use(passport.session()); //connect.sid 라는 이르으로 세션 쿠기가 브라우저로 전송.

app.use('/auth', authRouter);
app.use('/vote', voteRouter);
app.use('/board', boardRouter);
app.use('/sms', smsRouter);
app.use('/nawoo', nawooRouter);
app.use('/graph', graphRouter);
app.use('/scan', scanRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중 ');
  
  const contractInstance = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, { from: web3.adminWallet.address });
  schedule.scheduleJob('*/3 * * * *', function() { //3분마다 블록체인 정보를 가져와서 DB에 업데이트시킴.
    updateVoteDataScheduler(contractInstance, web3);
  });
});
