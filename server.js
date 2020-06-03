const express=require('express'); //pozivanje modula express
const path=require('path');
const mysql = require('mysql');
const ruter= require('./rute/ruter');
const bodyParser = require('body-parser');
const app =  express();
const dotenv=require('dotenv');
const cookieParser =require ('cookie-parser');

dotenv.config({path: './.env'});

//za uzimanje podataka sa viewov-a
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
//podaci koje uzimamo sa stranice su u JSON formatu
app.use(express.json());
app.use(cookieParser());

const publicDirektorij = path.join(__dirname, './public');
app.use(express.static(publicDirektorij));


//konfiguracija tj. defniranje ruta
app.set('views', path.join(__dirname, './views'));//dirname-om definiran folder views
app.set('view engine', 'hbs');//format view-a hbs
//app.engine('hbs', require('hbs').renderFile);
app.use("/", require('./rute/ruter'));
app.use("/auth", require('./rute/auth'));


var bazaConfig = require('./config/baza');
var connection = mysql.createConnection(bazaConfig.veza);
connection.connect((err) => {
  if (err) throw err;
  console.log('Uspješno povezivanje s bazom!');
});
//connection.query("USE" + bazaconfig.veza);


//definiranje porta
var port=3000;
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);
});


module.exports=app;
