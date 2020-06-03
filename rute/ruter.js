const express=require("express");
const ruter =express.Router();
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


module.exports=ruter; //export rutera 
