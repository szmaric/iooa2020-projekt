exports.renderNaslovna = (req,res) =>{
    res.render("index");
};

exports.spremiUnos =(req,res)=>{
    console.log(req);
    res.send("Podnijeli ste rezervaciju rođendanske zabave!");
};

exports.renderPrijava = (req,res) =>{
    res.render("prijava");
};

