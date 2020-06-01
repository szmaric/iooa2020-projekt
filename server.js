const express=require('express'); //pozivanje modula express
const path=require('path');
const mysql = require('mysql');
const ruter= require('./rute/ruter');
const bodyParser = require('body-parser');
const app =  express();

//dotenv.config({path: './.env'});

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(express.json());//dozvoljavanje aplikaciji korištenje json-a

//konfiguracija
app.set('views', path.join(__dirname, './views'));//dirname-om definiran folder views
app.set('view engine', 'ejs');//format view-a ejs
app.engine('ejs', require('ejs').renderFile);
app.use("/", ruter);


//povezivanje s bazom phpmyadmin
const veza = mysql.createConnection({
  host: 'ucka.veleri.hr',
  user: 'szmaric',
  password: '11',
  database: 'szmaric',
  port: '3306'
});

veza.connect((err) => {
  if (err) throw err;
  console.log('Uspješno povezivanje s bazom!');
});


app.post('/registracija',  (req, res)=>{
  console.log(req.body);

  var sql = "Insert into Admin values (null,'"+req.body.username+"','"+req.body.password+"','"+req.body.naziv+"')";
  veza.query(sql, (err, rows, fields)=>{
    if (err) throw err;

    res.render('../views/registracija', {title: 'Uspješan unos!',
        message: 'Podaci o prijavi su uspješno spremljeni u bazu.'});
  });
veza.end();
});


//definiranje porta
var port=3000;
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);

});

module.exports=app;
