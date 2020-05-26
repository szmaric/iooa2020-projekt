const express=require("express");

const ruter =express.Router();
const controller =require("./controllers/controller");

//početna stranica
ruter.get("/", controller.renderNaslovna);
ruter.post("/", controller.spremiUnos);
ruter.get('/prijava', controller.renderPrijava);


module.exports=ruter;