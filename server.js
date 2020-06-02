const express=require('express'); //pozivanje modula express
const path=require('path');
const mysql = require('mysql');
const ruter= require('./rute/ruter');
const bodyParser = require('body-parser');
const app =  express();

//za uzimanje podataka sa viewov-a
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
//podaci koje uzimamo sa stranice su u JSON formatu
app.use(express.json());

const publicDirektorij = path.join(__dirname, './public');
app.use(express.static(publicDirektorij));


//konfiguracija tj. defniranje ruta
app.set('views', path.join(__dirname, './views'));//dirname-om definiran folder views
app.set('view engine', 'hbs');//format view-a hbs
//app.engine('hbs', require('hbs').renderFile);
app.use("/", require('./rute/ruter'));
app.use("/auth", require('./rute/auth'));

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


/*app.post('/registracija',  (req, res)=>{
  console.log(req.body);

  var sql = "Insert into Admin values (null,'"+req.body.username+"','"+req.body.password+"','"+req.body.naziv+"')";
  veza.query(sql, (err, rows, fields)=>{
    if (err) throw err;

    res.render('../views/registracija', {title: 'Uspješan unos!',
        message: 'Podaci o prijavi su uspješno spremljeni u bazu.'});
  });
veza.end();
});*/


//definiranje porta
var port=3000;
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);

});

module.exports=app;
