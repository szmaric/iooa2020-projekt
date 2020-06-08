const mysql = require('mysql');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');


///veza na bazu podataka
var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);


exports.prijava= (req,res)=>{
    const {email, password}=req.body;
    connection.query('SELECT * FROM Admin WHERE email = ?',[email], (error,results, fields)=>{
        if (error){
            return res.render('prijava',{
                message:'Upit nije dobro napisan!'
            });
        }else{
            if(results.length>0){
                if(password==results[0].password){
                    return res.status(200).render('izbornik',{
                        message2:'Uspješna prijava!'
                    });
                }else{
                    return res.status(401).render('prijava',{
                        message:'Email ili lozinka nisu dobro uneseni!'
                    });
                }
            }
            else{
                return res.status(402).render('prijava',{
                    message:'Korisnik sa unesenom email adresom ne postoji!'
                });
            }
        }
    });
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


       connection.query('INSERT INTO Admin SET ?', {username:username, password:password, email:email},(error, results)=>{
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

