const mysql = require('mysql');
const express=require('express');

var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);

exports.rezervacija = (req, res) =>{
    console.log(req.body);
   
   const{ime, prezime, ime_slavljenika, br_uzvanika, god_slavljenika, kontakt, email_adr, napomena} = req.body;

   connection.query('INSERT INTO Korisnik SET  ?', {ime:ime, prezime:prezime, ime_slavljenika:ime_slavljenika, br_uzvanika: br_uzvanika,
     god_slavljenika:god_slavljenika, kontakt:kontakt, email:email_adr, napomena:napomena},(error, results)=>{
    if(error){
        console.log(error);
    }else{
        console.log(results);
        return res.render('index', {
        message3: 'Uspješno podnesena rezervacija!'
     });
    }
    });
};
