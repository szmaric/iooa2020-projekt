const express=require('express'); //pozivanje modula express
const path=require('path');
const mysql = require('mysql');
const ruter= require('./ruter');
const bodyParser = require('body-parser');

const app =  express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());


//konfiguracija
app.set('view engine', 'ejs');//format view-a ejs
app.set('views', path.join(__dirname, 'views'));//dirname-om definiran folder views

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


/*povezivanje s bazom OVO JE BILA ALTERNATIVA JER NISAM USPJEVALA POVEZAT phpmyadmin 
- FALIO MI JE ODBC DRIVER
//const sqlite3 = require('sqlite3').verbose();
//var baza = new sqlite3.Database('rodendan.db');//deklaracija baze podataka
var baza = new sqlite3.Database('rodendan.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Uspješno povezivanje s bazom.');
  });
  
 

  provjera unosa u bazu
 baza.run('INSERT INTO admin(sifra_admina, username, password, naziv) values (1, "sanja", "sanja", "Sanja Žmarić")', function(err) {
    if (err) {
      return console.log(err.message);
    }
    else {
        console.log('Uspješno je dodan red u bazu!');
    }

    prekid veze s bazom 
 baza.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Prekid veze s bazom.');
  });
   
  });*/


var port=3000
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);
});





