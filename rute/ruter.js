const express=require("express");
const ruter =express.Router();
var app=express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const controllerRez =require("../controllers/controllerRez");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);

//pozivanje stranica putem controllera
ruter.get('/', (req, res)=>{
    res.render('index');
});

ruter.get('/prijava', (req, res)=>{
    res.render('prijava');
});

ruter.get('/odjava', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

ruter.get('/registracija', (req, res)=>{
    res.render('registracija');
});

ruter.get('/rezervacije', controllerRez.pregledRez,(req, res) =>{
    res.render('rezervacije');
});

ruter.get('/otkazane', controllerRez.otkazane,(req, res) =>{
    res.render('otkazane');
});

ruter.get('/otkazivanje', (req, res)=>{
    res.render('otkazivanje');
});




module.exports=ruter; //export rutera 
