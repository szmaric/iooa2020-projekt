var express=require('express'); //pozivanje modula express
var path=require('path');
const sqlite3 = require('sqlite3').verbose();

const app =  express();
var baza = new sqlite3.Database('rodendan.db');//deklaracija baze podataka

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

//konfiguracija
app.set('view engine', 'ejs');//format view-a ejs
app.set('views', path.join(__dirname, 'views'));//dirname-om definiran folder views


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


//pozivanje početne i ostalih viewa
app.get('/', function(req, res){
    res.render('index');//pozivanje index stranice
});

app.get('/prijava', function(req, res){
    res.render('prijavas');
});


var port=3000
app.listen(port, function(){
    console.log('Server je pokrenut na portu '+port);
});






