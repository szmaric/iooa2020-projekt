const express=require('express'); //pozivanje modula express
const path=require('path');
const sqlite3 = require('sqlite3').verbose();
const ruter= require('./ruter');

const app =  express();
var baza = new sqlite3.Database('rodendan.db');//deklaracija baze podataka

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

//konfiguracija
app.set('view engine', 'ejs');//format view-a ejs
app.set('views', path.join(__dirname, 'views'));//dirname-om definiran folder views

app.use("/", ruter);




/////povezivanje s bazom
var baza = new sqlite3.Database('rodendan.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Uspješno povezivanje s bazom.');
  });
  
 

  /*provjera unosa u bazu
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






