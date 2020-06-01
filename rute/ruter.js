const express=require("express");
const bcrypt=require("bcrypt");
const ruter =express.Router();
var controller =require("../controllers/controller");
var app=express();
var bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());


//pozivanje stranica putem controllera
ruter.get('/', controller.renderNaslovna);
ruter.get('/prijava', controller.renderPrijava);
ruter.get('/registracija', controller.renderRegistracija);


module.exports=ruter;

//var path=require('path');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.urlencoded({extended:false}));
//app.use(express.static("public"));
//app.use(express.static(path.join(__dirname + '/public')));