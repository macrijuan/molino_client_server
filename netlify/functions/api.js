const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const { unknown } = require("./src/routes/errors.js");

const { conn } = require("./src/db.js");
const routes = require("./src/routes");

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://elmolinorestobar');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use("/.netlify/functions/api",
async (req, res, next)=>{
  conn.authenticate()
  .then(()=>{ next(); })
  .catch((err)=>{ console.log(err); res.json({errors:{unknown}}); })
},
routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports.handler = serverless(app);
