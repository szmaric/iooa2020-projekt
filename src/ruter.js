const express=require("express");
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
const ruter =express.Router();
const controller =require("./controllers/controller");

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser({
        uploadDir:path.join(__dirname, 'public/upload/temp')
    }));
    return app;
}
//početna stranica
ruter.get("/", controller.renderNaslovna);
ruter.post("/", controller.spremiUnos);
ruter.get('/prijava', controller.renderPrijava);

module.exports=ruter;