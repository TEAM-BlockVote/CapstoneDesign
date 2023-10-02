const express = require('express');
const pool = require('../server/Router/pool');
const router = express.Router();

router.get('/write', async (req, res, next) => {
  console.log("test");
});

module.exports = router;