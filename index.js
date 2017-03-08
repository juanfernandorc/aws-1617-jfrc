var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

var port = (process.env.PORT || 10000);
var baseApi = "/api/v1";
var dbFileName = path.join(__dirname, 'contacts.json');

var app = express();
app.use(bodyParser.json());

var port = (process.env.PORT || 3000);

var baseAPI = "/api/v1";

var contacts = [];

app.get(baseAPI + "/contacts", (request, response) => {
    response.send(contacts);
    console.log("GET /contacts");
});

app.post(baseAPI + "/contacts", (request, response) => {

    var contact = request.body;
    contacts.push(contact);

    response.sendStatus(201);

    console.log("POST /contacts");
});

app.delete(baseAPI + "/contacts", (request, response) => {

    var contact = request.body;
    contacts = [];

    response.sendStatus(200);

    console.log("DELETE /contacts");
});

app.get(baseAPI + "/contacts/:name", (request, response) => {
    var name = request.params.name;

    var contact = contacts.filter((contact) => {
        return (contact.name == name);
    })[0];
    
    if (contact)
        response.send(contact);
    else    
        response.sendStatus(404);
        
    console.log("GET /contacts/"+name);
});


app.delete(baseAPI + "/contacts/:name", (request, response) => {
    var name = request.params.name;

    contacts = contacts.filter((contact) => {
        return (contact.name != name);
    });

    response.sendStatus(200);
    console.log("DELETE /contacts/" + name);
});


app.put(baseAPI + "/contacts/:name", (request, response) => {
    var name = request.params.name;
    var updatedContact = request.body;

    contacts = contacts.map((contact) => {
        if (contact.name == name) {
            return updatedContact;
        }
        else {
            return contact;
        }
    });
    
    response.sendStatus(200);

    console.log("UPDATE /contacts/"+name);
});


app.listen(port, () => {
    console.log("Server up and running!!");
});