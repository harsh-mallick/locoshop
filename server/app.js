// importing things
require('dotenv').config()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path')
require('./db/conn')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use(require("./router/auth"));
app.use(cors());

const consumerauthenticate = require('./middleware/consumerauthenticate');
const idauthenticate = require('./middleware/idauth');


if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

// make a localhost with port
dotenv.config({path: "./config.env"});


const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Express is working on port ${server.address().port}`);
  });

app.get("/getshoplist",consumerauthenticate, (req, res) => {
  console.log(req.rootUser)
  res.send(req.rootUser)
} )