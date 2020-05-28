const express=require('express'); //pozivanje modula express
const path=require('path');
const mysql = require('mysql');
const ruter= require('./ruter');
const bodyParser = require('body-parser');

const app =  express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());


//konfiguracija
app.set('views', path.join(__dirname, 'views'));//dirname-om definiran folder views
app.set('view engine', 'ejs');//format view-a ejs

app.use("/", ruter);

//povezivanje s bazom phpmyadmin
const veza = mysql.createConnection({
  host: 'ucka.veleri.hr',
  user: 'szmaric',
  password: '11',
  database: 'szmaric',
  port:'3306'
});
veza.connect((err) => {
  if (err) throw err;
  console.log('Uspješno povezivanje s bazom!');
});



var port=3000
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);

});

module.exports=app;
