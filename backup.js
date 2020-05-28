/*provjera unosa u bazu
var sql = "INSERT INTO Admin(sifra_admina, username, password, naziv) values (1, 'sanja', 'sanja', 'Sanja Žmarić')";
  veza.query(sql, function (err, result){
    if (err) throw err;
    console.log("Uspješno dodan red u bazu.");
  });
/*






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