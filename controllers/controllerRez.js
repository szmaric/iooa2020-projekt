const mysql = require('mysql');
const express=require('express');
const nodemailer=require('nodemailer');

var bazaConfig = require('../config/baza');
var connection = mysql.createConnection(bazaConfig.veza);

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'projektiooa@gmail.com',
        pass: 'projekt123'
    }
});


////////////////////OTKAZIVANJE REZERVACIJE/////////////////////////
exports.otkazivanje=(req, res)=>{
    console.log(req.body);

    const { datum, vrijeme}=req.body;
    
    connection.query("UPDATE Rezervacija SET status_rezervacije='otkazano' where datum= ? and vrijeme =?", [datum, vrijeme],(error, results)=>{
        ///sve sam probala, ali ne mogu otkriti što je problem ovdje da se uvijek javlja ista poruka...
        if (!datum || !vrijeme){
            console.log(results);
            return res.render('otkazivanje', {
            message2: 'Uneseni datumi i vrijeme ne postoje u sustavu. Unesite ispravan datum i vrijeme rezervacije!'
            
        });
        }else{
            return res.render('otkazivanje', {
            message: 'Vaša rezervacija je uspješno otkazana!'
            
        });
        }
    });

    /////////////////SLANJE EMAILA O OTKAZIVANJU REZERVACIJE///////////////
function sendMail(mail){
    var mailOptions={
        from: 'projektiooa@gmail.com',
        to: mail.to,
        subject: mail.subject,
        html: mail.body
    };

    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
        }else{
            console.log('Potvrda za otkazivanje rezervacije je poslana na unesenu email adresu' +info.response);
        }
    });
}

    mail={
        to:req.body.email_adr,
        subject: 'Otkazivanje rezervacije',
        body: 
        `Poštovani,

obavještavamo vas da je vaša rezervacija uspješno otkazana.`
    };
   
  sendMail(mail);  
};



////////////////////REZERVACIJA///////////////////
exports.rezervacija = (req, res) =>{
    console.log(req.body);
   
   const{ime, prezime, ime_slavljenika, br_uzvanika, god_slavljenika, kontakt, email_adr, napomena, datum, vrijeme} = req.body;
    //naišla sam na problem, ako stavim i status_rezervacije is null da mi ne provjerava one koji su otkazani jednostavno ne radi i uvijek dozvoli rezervaciju
   connection.query("SELECT datum,vrijeme FROM Rezervacija WHERE datum = ? and vrijeme = ? and status_rezervacije = ' ' ", [datum, vrijeme], async(error,results) =>{
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


/////////////////SLANJE EMAILA POTVRDE///////////////
function sendMail(mail){
    var mailOptions={
        from: 'projektiooa@gmail.com',
        to: mail.to,
        subject: mail.subject,
        html: mail.body
    };

    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
        }else{
            console.log('Potvrda za rezervaciju je poslana na unesenu email adresu' +info.response);
        }
    });
}

    mail={
        to:req.body.email_adr,
        subject: 'Potvrda rezervacije',
        body: 
        `Poštovani,

obavještavamo vas da je vaša rezervacija uspješno provedena.
Vidimo se u igraonici Barbi!`
    };
   
  sendMail(mail);  

};

////////////////////////////PREGLED REZERVACIJA///////////////////////////  
exports.pregledRez = (req, res)=>{
    console.log(req.body);

    connection.query("SELECT sifra_rezervacije,ime, ime_slavljenika, br_uzvanika, email, datum, vrijeme from Rezervacija where status_rezervacije=' ' ", (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Rezultati:",results);
            res.render('rezervacije', {data: results});
        }
    });
};


//////////////////////PREGLED OTKAZANIH REZERVACIJA////////////////
exports.otkazane = (req, res)=>{
    console.log(req.body);

    connection.query("SELECT sifra_rezervacije,ime, ime_slavljenika, br_uzvanika, email, datum, vrijeme from Rezervacija where status_rezervacije='otkazano' ", (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Rezultati:",results);
            res.render('rezervacije', {data: results});
        }
    });
};

