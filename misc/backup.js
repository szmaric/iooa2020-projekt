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


  //povezivanje s bazom phpmyadmin
/*const veza = mysql.createConnection({
  host: 'ucka.veleri.hr',
  user: 'szmaric',
  password: '11',
  database: 'szmaric',
});

veza.connect((err) => {
  if (err) throw err;
  console.log('Uspješno povezivanje s bazom!');
});*/



//////////////////////PRIJAVA//////////////////////////////////////
//async zapravo omogućava da server čeka završetak akcije tj. da se ne ugasi
/*exports.prijava= (req,res)=>{
    try {
        const {email, password}=req.body;

        if(!email || !password){
            return res.status(400).render('prijava',{
                message: 'Za prijavu je potrebno unijeti email i lozinku!'
            });
        }
                                                                    //ovdje iza zareza ide async 
        connection.query('SELECT * FROM Admin WHERE email = ?',[email], (error,results)=>{
            console.log(results);
                            //iza ! ide await, ali sa time mi nikako nije radio login, sada radi bez provjere lozinke  
            if(!results.email || ! (bcrypt.compare(password, results[0].password))){
                res.status(401).render('prijava', {
                    message: 'Korisničko ime ili lozinka nisu dobro unešeni!'
                }); 
            }     
            else {
                const sifra_admina = results[0].sifra_admina;

                const token = jwt.sign({sifra_admina:sifra_admina}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log('Token je: '+token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 ),
                  
                };

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/rezervacije');
            }

        });

    } catch (error) {
        console.log(error);
    }

};*/

/*exports.pregledRez = (response)=>{
    executeQuery("SELECT ime, ime_slavljenika, br_uzvanika, email, datum, vrijeme from Rezervacija where status_rezervacije=''", function(result){
        console.log(result);
        response.write("<table><tr>");
        for(var column in result[0]){
            response.write('<td><label>'+column+'</label></td>');
            res.write('</tr>');
        }
        for (var row in result){
            response.write('<tr>');
            for(var column in result[row]){
                response.write('<td><label>'+result[row][column]+'</label></td>');
            }
            response.write('</tr>');
        }
        response.end('</table>');
    }); 

    function executeQuery (sql, cb){
        connection.query(sql, function (error, result, fields){
           if(error) {throw error;} 
           cb(result);
        });
    }
};*/
