const express = require("express")
const bodyParser = require('body-parser');

const app = express()

const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const landingpagecrud=require("./crudop/crud")

app.use("/homepage", landingpagecrud)

module.exports=app