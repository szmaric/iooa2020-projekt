const mysql = require('mysql');
const express=require('express');

var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);



exports.otkazivanje=(req, res)=>{
    console.log(req.body);

    const { datum, vrijeme}=req.body;

    connection.query("UPDATE Rezervacija SET status_rezervacije='otkazano' where datum= ? and vrijeme =?", [datum, vrijeme],(error, results)=>{
        if (!datum || !vrijeme){
            console.log(results);
            return res.render('otkazivanje', {
            message2: 'Uneseni datumi i vrijeme ne postoje u sustavu. Unesite ispravan datum i vrijeme!'
            
        });
        }else{
            return res.render('otkazivanje', {
            message: 'Vaša rezervacija je uspješno otkazana!'
            
        });
        }
    });
};


exports.rezervacija = (req, res) =>{
    console.log(req.body);
   
   const{ime, prezime, ime_slavljenika, br_uzvanika, god_slavljenika, kontakt, email_adr, napomena, datum, vrijeme} = req.body;


   connection.query('SELECT datum,vrijeme FROM Rezervacija WHERE datum = ? and vrijeme = ? and status_rezervacije is null', [datum, vrijeme], async(error,results) =>{
    if(error){
     console.log(error);
    }
     if(results.length > 0){
        return res.render('index', {
            message: 'Odabrani datum i vrijeme su već rezervirani. Molimo Vas odaberite drugo vrijeme održavanja zabave u razmaku od dva sata prije ili poslije trenutno odabranog termina!'
        });
    } 

   connection.query('INSERT INTO Rezervacija SET  ? ', {ime:ime, prezime:prezime, ime_slavljenika:ime_slavljenika, br_uzvanika: br_uzvanika,
    god_slavljenika:god_slavljenika, kontakt:kontakt, email:email_adr, napomena:napomena, datum:datum, vrijeme:vrijeme},(error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log(results);
            return res.render('index', {
            message3: 'Uspješno podnesena rezervacija!'
        });
    }
    });
});

};
