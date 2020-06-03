const express=require("express");
const bcrypt=require("bcryptjs");
const ruter =express.Router();
const controller =require("../controllers/controller");
var app=express();
var bodyParser = require('body-parser');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());


ruter.post('/registracija', controller.registracija);
ruter.post('/prijava', controller.prijava);


module.exports=ruter;