const express = require('express');
const cors = require("cors");
const connectDB = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = require('../routes/router');
const errorHandler = require('../middleware/errorHandler');
connectDB();

const app = express();

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(passport.initialize());

require('../config/passport')(passport);

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(errorHandler);

// const fs = require('fs');
// const models = ['事業所_T', '作業地_T', '協力会社_T', '料金DB_リフト_T', '料金DB_下払高速_T', '料金DB_庸車3軸_T', '料金DB_庸車基本_T', '料金DB_荷主3軸_T', '料金DB_荷主基本_T', '料金DB_高速_T', '海上コンテナ受注_T', '船社_T', '荷主_T', '顧客_T'];
// models.map((item, index) => {
//   const Item = require(`../models/${item}`);
//   const data = JSON.parse(fs.readFileSync(`Data/${item}_data.json`, 'utf8'));
  
//   try {
//     Item.insertMany(data);
//   } catch (error) {
//     console.log(item, error);
//   }
// })

module.exports = app;