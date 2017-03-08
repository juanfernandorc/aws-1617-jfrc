var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var dataStore = require('nedb');
var dbFileName = path.join(__dirname, 'contacts.json');

var db = new dataStore({
    filename : dbFileName,
    autoload : true
});

var port = (process.env.PORT || 10000);

var app = express();
app.use(bodyParser.json());

var port = (process.env.PORT || 3000);  

var baseAPI = "/api/v1";

//var contacts = [];

app.get(baseAPI + "/contacts", (request, response) => {
    // var contacts;
    
    db.find({}, (err, contacts)=> {
        response.send(contacts);
    });
    
    console.log("GET /contacts");
});

app.post(baseAPI + "/contacts", (request, response) => {

    var contact = request.body;
    db.insert(contact);

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