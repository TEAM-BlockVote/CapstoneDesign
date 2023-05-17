const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();
const pool = require('./server/Router/pool');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 5000);
app.use(cors());

app.get('/', (req, res) => {
  res.send({ test: "hi" });
});

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

app.post('/signup', (req, res) => {
  const param = [req.body.studentNumber, req.body.name, req.body.dep, req.body.password, req.body.telNumber];

  console.log(req.body);
  pool.query('INSERT INTO users(`studentNumber`, `name`, `dep`, `password`, `telNumber`) VALUES (?, ?, ?, ?, ?)', param, (err, row) =>{
    if(err) console.log(err);
  });
  res.redirect('/');
});