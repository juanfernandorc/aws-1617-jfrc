var cool = require("cool-ascii-faces");
var express = require("express");
var port = ( process.env.PORT || 3000);
var app = express();
var baseAPI = "/api/v1";
var bodyParser = requier("body-parser");
app.use(bodyParser.json());

var contacts = [
    {name: "pepe", phone:"12345", email:"pepe@pepe.com"},
    {name: "luis", phone:"6789", email:"luis@luis.com"}
    ];
//console.log(cool());

app.get(baseAPI+"/contacts", (request,response) => {
    response.send(contacts);
   console.log("GET /contacts");
});

app.post(baseAPI+"/contacts", (request,response) => {
    var contact = request.body;
    contacts.push(contact);
    response.sendStatus(201);
   console.log("POST /contacts");
})

app.listen(port, () => {
    console.log("Server up and running!");
});
