const mysql = require('mysql');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');


const veza = mysql.createConnection({
    host: 'ucka.veleri.hr',
    user: 'szmaric',
    password: '11',
    database: 'szmaric',
    port: '3306'
  });

exports.registracija = (req, res)=>{
   console.log(req.body);
   
   const{username, password, potvrdaLoz, email} = req.body;

   veza.query('SELECT email FROM Admin WHERE email = ?', [email], async(error,results) =>{
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

       veza.query('INSERT INTO Admin SET ?', {username:username, password:hashedPassword, email:email},(error, results)=>{
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
