const express=require("express");
const bcrypt=require("bcryptjs");
const ruter =express.Router();
var controller =require("../controllers/controller");
var app=express();
var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());


//pozivanje stranica putem controllera
ruter.get('/', (req, res)=>{
    res.render('index');
});

ruter.get('/prijava', (req, res)=>{
    res.render('prijava');
});

ruter.get('/registracija', (req, res)=>{
    res.render('registracija');
});

ruter.get('/rezervacije', (req, res)=>{
    res.render('rezervacije');
});

ruter.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports=ruter; //export rutera 

//var path=require('path');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.urlencoded({extended:false}));
//app.use(express.static("public"));
//app.use(express.static(path.join(__dirname + '/public')));