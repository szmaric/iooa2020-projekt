const mysql = require('mysql');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');


///veza na bazu podataka
var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);
//connection.query("USE" + bazaconfig.veza);


//////////////////////PRIJAVA//////////////////////////////////////
//async zapravo omogućava da server čeka završetak akcije tj. da se ne ugasi
exports.prijava= async(req,res)=>{
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
            if( !results || !(bcrypt.compare(password, results[0].password)) ){
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

};




////////////////////////////REGISTRACIJA//////////////////////////
exports.registracija = (req, res)=>{
   console.log(req.body);
   
   const{username, password, potvrdaLoz, email} = req.body;

   connection.query('SELECT email FROM Admin WHERE email = ?', [email], async(error,results) =>{
       if(error){
        console.log(error);
       }
        if(results.length > 0 ){
           return res.render('registracija', {
               message: 'Uneseni email se već koristi!'
           });
       } else if (password !== potvrdaLoz){
            return res.render('registracija', {
            message: 'Unesene lozinke se ne podudaraju!'
        });
       }

       let hashedPassword = await  bcrypt.hash(password,8);
       console.log(hashedPassword);

       connection.query('INSERT INTO Admin SET ?', {username:username, password:hashedPassword, email:email},(error, results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('registracija', {
                message2: 'Uspješna registracija korisnika!'
                });
            }
       });

   });

};

